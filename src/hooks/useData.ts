import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

// Types
export interface Profile {
  id: string;
  email: string;
  name: string;
  role: string;
  position: string | null;
  department_id: string | null;
  is_deleted: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Invoice {
  id: string;
  request_id: string | null;
  total_cost: number | null;
  tax: number | null;
  discount: number | null;
  grand_total: number | null;
  issued_by: string | null;
  created_at: string | null;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string | null;
  progress: number | null;
  start_date: string | null;
  end_date: string | null;
  client_name: string | null;
  location: string | null;
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
      return data as unknown as Profile;
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
      return (data ?? []) as unknown as Invoice[];
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
      return (data ?? []) as unknown as Project[];
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
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
