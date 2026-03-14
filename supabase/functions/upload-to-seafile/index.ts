import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SEAFILE_TOKEN = Deno.env.get("SEAFILE_TOKEN");
    const SEAFILE_REPO_ID = Deno.env.get("SEAFILE_REPO_ID");
    const SEAFILE_URL = Deno.env.get("SEAFILE_URL");

    if (!SEAFILE_TOKEN || !SEAFILE_REPO_ID || !SEAFILE_URL) {
      throw new Error("Seafile credentials not configured");
    }

    const { file_base64, file_name, parent_dir = "/whatsapp-files" } = await req.json();

    if (!file_base64 || !file_name) {
      return new Response(
        JSON.stringify({ error: "file_base64 and file_name are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 1: Get upload link
    const uploadLinkRes = await fetch(
      `${SEAFILE_URL}/api2/repos/${SEAFILE_REPO_ID}/upload-link/`,
      {
        headers: { Authorization: `Token ${SEAFILE_TOKEN}` },
      }
    );

    if (!uploadLinkRes.ok) {
      const errText = await uploadLinkRes.text();
      throw new Error(`Failed to get upload link: ${errText}`);
    }

    const uploadUrl = (await uploadLinkRes.text()).replace(/"/g, "");
    console.log("Got upload URL:", uploadUrl);

    // Step 2: Create directory if it doesn't exist
    try {
      await fetch(
        `${SEAFILE_URL}/api2/repos/${SEAFILE_REPO_ID}/dir/?p=${encodeURIComponent(parent_dir)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${SEAFILE_TOKEN}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "operation=mkdir",
        }
      );
    } catch {
      // Directory may already exist
    }

    // Step 3: Upload file
    const binaryStr = atob(file_base64);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }

    const formData = new FormData();
    formData.append("file", new Blob([bytes]), file_name);
    formData.append("parent_dir", parent_dir);
    formData.append("replace", "1");

    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Token ${SEAFILE_TOKEN}`,
      },
      body: formData,
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      throw new Error(`Upload failed: ${errText}`);
    }

    const uploadResult = await uploadRes.text();
    console.log("Upload result:", uploadResult);

    // Step 4: Get file link
    const fileLink = `${SEAFILE_URL}/lib/${SEAFILE_REPO_ID}/file${parent_dir}/${encodeURIComponent(file_name)}`;

    return new Response(
      JSON.stringify({
        success: true,
        file_name,
        file_link: fileLink,
        parent_dir,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Seafile upload error:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
