import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const demoEmail = "demo@alazab.com";
    const demoPassword = "demo123456";

    // Check if demo user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingDemo = existingUsers?.users?.find(u => u.email === demoEmail);

    if (existingDemo) {
      // Update password and confirm email if needed
      await supabase.auth.admin.updateUserById(existingDemo.id, {
        password: demoPassword,
        email_confirm: true,
      });

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "تم تحديث الحساب التجريبي بنجاح",
          userId: existingDemo.id 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create new demo user with confirmed email
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: demoEmail,
      password: demoPassword,
      email_confirm: true,
      user_metadata: {
        full_name: "حساب تجريبي",
      },
    });

    if (createError) {
      throw createError;
    }

    // Create profile for demo user
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: newUser.user.id,
        email: demoEmail,
        full_name: "حساب تجريبي",
        company_name: "شركة تجريبية",
        phone: "+966500000000",
        account_status: "active",
        is_verified: true,
      });

    if (profileError) {
      console.error("Profile creation error:", profileError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "تم إنشاء الحساب التجريبي بنجاح",
        userId: newUser.user.id 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error:", errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
