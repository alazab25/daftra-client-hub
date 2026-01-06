import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

// Types
export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  company_name: string | null;
  daftra_client_id: string | null;
  notification_email: boolean | null;
  notification_sms: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;
  client_email: string | null;
  amount: number;
  paid_amount: number;
  status: string;
  issue_date: string;
  due_date: string | null;
  created_at: string | null;
}

export interface Payment {
  id: string;
  amount: number;
  payment_date: string;
  payment_method: string | null;
  status: string | null;
  invoice_id: string | null;
  created_at: string | null;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  progress: number | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string | null;
}

// Hooks
export const useProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!user,
  });
};

export const useInvoices = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["invoices", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Invoice[];
    },
    enabled: !!user,
  });
};

export const usePayments = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["payments", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .order("payment_date", { ascending: false });

      if (error) throw error;
      return data as Payment[];
    },
    enabled: !!user,
  });
};

export const useProjects = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["projects", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
    enabled: !!user,
  });
};

export const useSyncWithDaftra = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("daftra-sync");
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};