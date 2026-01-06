import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

interface DaftraConfig {
  baseUrl: string;
  apiKey: string;
}

async function fetchFromDaftra(endpoint: string, config: DaftraConfig) {
  const response = await fetch(`${config.baseUrl}${endpoint}`, {
    headers: {
      "APIKEY": config.apiKey,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Daftra API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function syncClients(supabase: any, config: DaftraConfig, userId: string) {
  try {
    const data = await fetchFromDaftra("/clients", config);
    const clients = data.data || [];
    
    // Update profile with daftra_client_id if found
    for (const client of clients) {
      // Match by email or phone
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, email")
        .eq("id", userId)
        .single();
      
      if (profile && (profile.email === client.email || profile.phone === client.phone)) {
        await supabase
          .from("profiles")
          .update({ daftra_client_id: client.id.toString() })
          .eq("id", userId);
        break;
      }
    }

    return { success: true, count: clients.length };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error syncing clients:", error);
    return { success: false, error: errorMessage };
  }
}

async function syncInvoices(supabase: any, config: DaftraConfig, userId: string, daftraClientId: string) {
  try {
    const data = await fetchFromDaftra(`/invoices?client_id=${daftraClientId}`, config);
    const invoices = data.data || [];

    for (const invoice of invoices) {
      const invoiceData = {
        user_id: userId,
        daftra_invoice_id: invoice.id.toString(),
        invoice_number: invoice.number || `INV-${invoice.id}`,
        client_name: invoice.client_name || "عميل",
        amount: parseFloat(invoice.grand_total || 0),
        paid_amount: parseFloat(invoice.paid || 0),
        status: invoice.paid >= invoice.grand_total ? "paid" : 
                new Date(invoice.due_date) < new Date() ? "overdue" : "pending",
        issue_date: invoice.date || new Date().toISOString().split("T")[0],
        due_date: invoice.due_date,
        items: invoice.invoice_items || [],
        notes: invoice.notes,
      };

      await supabase
        .from("invoices")
        .upsert(invoiceData, { onConflict: "daftra_invoice_id" });
    }

    return { success: true, count: invoices.length };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error syncing invoices:", error);
    return { success: false, error: errorMessage };
  }
}

async function syncPayments(supabase: any, config: DaftraConfig, userId: string, daftraClientId: string) {
  try {
    const data = await fetchFromDaftra(`/payments?client_id=${daftraClientId}`, config);
    const payments = data.data || [];

    for (const payment of payments) {
      // Find related invoice
      const { data: invoice } = await supabase
        .from("invoices")
        .select("id")
        .eq("daftra_invoice_id", payment.invoice_id?.toString())
        .single();

      const paymentData = {
        user_id: userId,
        invoice_id: invoice?.id,
        daftra_payment_id: payment.id.toString(),
        amount: parseFloat(payment.amount || 0),
        payment_method: payment.payment_method || "تحويل بنكي",
        payment_date: payment.date || new Date().toISOString().split("T")[0],
        reference_number: payment.reference,
        notes: payment.notes,
      };

      await supabase
        .from("payments")
        .upsert(paymentData, { onConflict: "daftra_payment_id" });
    }

    return { success: true, count: payments.length };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error syncing payments:", error);
    return { success: false, error: errorMessage };
  }
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const daftraApiKey = Deno.env.get("DAFTRA_API_KEY");
    const daftraBaseUrl = Deno.env.get("DAFTRA_BASE_URL") || "https://api.daftrah.dev";

    if (!daftraApiKey) {
      return new Response(
        JSON.stringify({ error: "DAFTRA_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const config: DaftraConfig = {
      baseUrl: daftraBaseUrl,
      apiKey: daftraApiKey,
    };

    // Verify auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { action } = await req.json();

    // Get user's daftra_client_id
    const { data: profile } = await supabase
      .from("profiles")
      .select("daftra_client_id")
      .eq("id", user.id)
      .single();

    // Log sync start
    const { data: syncLog } = await supabase
      .from("sync_logs")
      .insert({ sync_type: action || "full", status: "pending" })
      .select()
      .single();

    let results: Record<string, any> = {};

    switch (action) {
      case "sync_clients":
        results.clients = await syncClients(supabase, config, user.id);
        break;
      case "sync_invoices":
        if (!profile?.daftra_client_id) {
          return new Response(
            JSON.stringify({ error: "No Daftra client linked to this account" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        results.invoices = await syncInvoices(supabase, config, user.id, profile.daftra_client_id);
        break;
      case "sync_payments":
        if (!profile?.daftra_client_id) {
          return new Response(
            JSON.stringify({ error: "No Daftra client linked to this account" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        results.payments = await syncPayments(supabase, config, user.id, profile.daftra_client_id);
        break;
      default:
        // Full sync
        results.clients = await syncClients(supabase, config, user.id);
        if (profile?.daftra_client_id) {
          results.invoices = await syncInvoices(supabase, config, user.id, profile.daftra_client_id);
          results.payments = await syncPayments(supabase, config, user.id, profile.daftra_client_id);
        }
    }

    // Update sync log
    const totalRecords = Object.values(results).reduce((sum: number, r: any) => sum + (r.count || 0), 0);
    const hasErrors = Object.values(results).some((r: any) => !r.success);

    await supabase
      .from("sync_logs")
      .update({
        status: hasErrors ? "failed" : "success",
        records_synced: totalRecords,
        completed_at: new Date().toISOString(),
        error_message: hasErrors ? JSON.stringify(Object.values(results).filter((r: any) => r.error)) : null,
      })
      .eq("id", syncLog.id);

    return new Response(
      JSON.stringify({ success: true, results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Sync error:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
