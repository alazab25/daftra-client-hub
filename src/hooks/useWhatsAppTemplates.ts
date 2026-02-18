import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface WhatsAppTemplate {
  id: string;
  template_key: string;
  template_name: string;
  header_text: string | null;
  body_text: string;
  footer_text: string | null;
  buttons: any;
  variables: any;
  language: string | null;
  event_type: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useWhatsAppTemplates = () => {
  return useQuery({
    queryKey: ["whatsapp-templates"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("notification_templates")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return (data ?? []) as WhatsAppTemplate[];
    },
  });
};

export const useActiveTemplates = () => {
  return useQuery({
    queryKey: ["whatsapp-templates", "active"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("notification_templates")
        .select("*")
        .eq("is_active", true)
        .order("template_name", { ascending: true });
      
      if (error) throw error;
      return (data ?? []) as WhatsAppTemplate[];
    },
  });
};

export const useTemplateByKey = (templateKey: string) => {
  return useQuery({
    queryKey: ["whatsapp-templates", templateKey],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("notification_templates")
        .select("*")
        .eq("template_key", templateKey)
        .eq("is_active", true)
        .single();
      
      if (error) throw error;
      return data as WhatsAppTemplate;
    },
    enabled: !!templateKey,
  });
};

export const useSendWhatsAppMessage = () => {
  return useMutation({
    mutationFn: async ({
      phone,
      templateKey,
      variables,
    }: {
      phone: string;
      templateKey: string;
      variables: string[];
    }) => {
      const { data, error } = await supabase.functions.invoke("send-whatsapp", {
        body: {
          phone,
          template_key: templateKey,
          variables,
        },
      });
      
      if (error) throw error;
      return data;
    },
  });
};
