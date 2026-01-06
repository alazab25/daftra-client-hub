import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  documentId: string;
  reviewerOrder: number;
  type: "review_request" | "approved" | "rejected" | "needs_revision";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const whatsappToken = Deno.env.get("WHATSAPP_ACCESS_TOKEN");
    const whatsappPhoneId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { documentId, reviewerOrder, type }: NotificationRequest = await req.json();

    console.log("Processing notification request:", { documentId, reviewerOrder, type });

    // Get document info
    const { data: document, error: docError } = await supabase
      .from("documents")
      .select("*")
      .eq("id", documentId)
      .single();

    if (docError || !document) {
      throw new Error("Document not found");
    }

    // Get reviewer info
    const { data: reviewer, error: reviewerError } = await supabase
      .from("document_reviewers")
      .select("*")
      .eq("document_id", documentId)
      .eq("review_order", reviewerOrder)
      .single();

    if (reviewerError || !reviewer) {
      throw new Error("Reviewer not found");
    }

    const notificationResults: { whatsapp?: boolean; email?: boolean } = {};

    // Build message based on type
    let messageContent = "";
    let subject = "";
    
    switch (type) {
      case "review_request":
        messageContent = `مرحباً ${reviewer.reviewer_name}،\n\nلديك طلب مراجعة جديد للمستند: ${document.title}\n\nيرجى مراجعة المستند واتخاذ الإجراء المناسب.\n\nشكراً لك`;
        subject = `طلب مراجعة: ${document.title}`;
        break;
      case "approved":
        messageContent = `تم اعتماد المستند: ${document.title}\n\nشكراً لمراجعتك`;
        subject = `تم الاعتماد: ${document.title}`;
        break;
      case "rejected":
        messageContent = `تم رفض المستند: ${document.title}\n\nيرجى مراجعة الملاحظات`;
        subject = `تم الرفض: ${document.title}`;
        break;
      case "needs_revision":
        messageContent = `المستند يحتاج تعديلات: ${document.title}\n\nيرجى مراجعة الملاحظات وإجراء التعديلات اللازمة`;
        subject = `يحتاج تعديل: ${document.title}`;
        break;
    }

    // Send WhatsApp notification (primary)
    if (whatsappToken && whatsappPhoneId && reviewer.reviewer_phone) {
      try {
        const phoneNumber = reviewer.reviewer_phone.replace(/[^0-9]/g, "");
        
        console.log("Sending WhatsApp to:", phoneNumber);

        const whatsappResponse = await fetch(
          `https://graph.facebook.com/v18.0/${whatsappPhoneId}/messages`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${whatsappToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              to: phoneNumber,
              type: "text",
              text: {
                body: messageContent,
              },
            }),
          }
        );

        const whatsappResult = await whatsappResponse.json();
        console.log("WhatsApp response:", whatsappResult);

        if (whatsappResponse.ok) {
          notificationResults.whatsapp = true;
          
          // Update notified_at
          await supabase
            .from("document_reviewers")
            .update({ notified_at: new Date().toISOString() })
            .eq("id", reviewer.id);

          // Add history entry
          await supabase.from("document_review_history").insert({
            document_id: documentId,
            reviewer_id: reviewer.id,
            action: "notification_sent",
            notification_type: "whatsapp",
            notes: `تم إرسال إشعار واتساب إلى ${reviewer.reviewer_name}`,
          });
        } else {
          console.error("WhatsApp error:", whatsappResult);
          notificationResults.whatsapp = false;
        }
      } catch (whatsappError: unknown) {
        console.error("WhatsApp send error:", whatsappError);
        notificationResults.whatsapp = false;
      }
    }

    // Send Email notification (backup)
    if (resendApiKey && reviewer.reviewer_email) {
      try {
        const resend = new Resend(resendApiKey);
        
        console.log("Sending email to:", reviewer.reviewer_email);

        const emailResult = await resend.emails.send({
          from: "نظام المستخلصات <onboarding@resend.dev>",
          to: [reviewer.reviewer_email],
          subject: subject,
          html: `
            <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px;">
              <h2 style="color: #1e40af;">${subject}</h2>
              <p style="white-space: pre-line; font-size: 16px; line-height: 1.8;">
                ${messageContent}
              </p>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
              <p style="color: #6b7280; font-size: 14px;">
                هذه رسالة آلية من نظام إدارة المستخلصات
              </p>
            </div>
          `,
        });

        console.log("Email response:", emailResult);
        notificationResults.email = true;

        // Only add email history if WhatsApp wasn't sent
        if (!notificationResults.whatsapp) {
          await supabase
            .from("document_reviewers")
            .update({ notified_at: new Date().toISOString() })
            .eq("id", reviewer.id);

          await supabase.from("document_review_history").insert({
            document_id: documentId,
            reviewer_id: reviewer.id,
            action: "notification_sent",
            notification_type: "email",
            notes: `تم إرسال بريد إلكتروني إلى ${reviewer.reviewer_name}`,
          });
        }
      } catch (emailError: unknown) {
        console.error("Email send error:", emailError);
        notificationResults.email = false;
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        results: notificationResults,
        message: "Notifications processed" 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error: unknown) {
    console.error("Notification error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});