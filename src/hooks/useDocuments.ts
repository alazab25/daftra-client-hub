import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface DocumentReviewer {
  name: string;
  email: string;
  phone: string;
  department: string;
  order: number;
}

export interface CreateDocumentData {
  title: string;
  description: string;
  senderName: string;
  projectId: string | null;
  files: File[];
  reviewers: DocumentReviewer[];
}

export const useDocuments = () => {
  const { user } = useAuth();

  const documentsQuery = useQuery({
    queryKey: ["documents", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select(`
          *,
          projects:project_id (name),
          document_reviewers (*)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const statsQuery = useQuery({
    queryKey: ["documents-stats", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("status, approved_at");

      if (error) throw error;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const stats = {
        total: data?.length || 0,
        pending_review: data?.filter((d) => d.status === "pending_review").length || 0,
        needs_revision: data?.filter((d) => d.status === "needs_revision").length || 0,
        ready_for_approval: data?.filter((d) => d.status === "ready_for_approval").length || 0,
        approved_today: data?.filter((d) => {
          if (!d.approved_at) return false;
          const approvedDate = new Date(d.approved_at);
          return approvedDate >= today;
        }).length || 0,
        awaiting_signature: data?.filter((d) => 
          d.status === "ready_for_approval"
        ).length || 0,
        monthly_completion: 87, // This would be calculated from real data
      };

      return stats;
    },
    enabled: !!user,
  });

  return {
    documents: documentsQuery.data || [],
    stats: statsQuery.data,
    isLoading: documentsQuery.isLoading || statsQuery.isLoading,
    error: documentsQuery.error || statsQuery.error,
  };
};

export const useCreateDocument = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateDocumentData) => {
      if (!user) throw new Error("User not authenticated");

      // Upload files to storage
      const fileUrls: string[] = [];
      
      for (const file of data.files) {
        const fileName = `${user.id}/${Date.now()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("documents")
          .upload(fileName, file);

        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from("documents")
          .getPublicUrl(uploadData.path);
        
        fileUrls.push(urlData.publicUrl);
      }

      // Create document
      const { data: document, error: docError } = await supabase
        .from("documents")
        .insert({
          user_id: user.id,
          project_id: data.projectId,
          title: data.title,
          description: data.description,
          sender_name: data.senderName,
          file_urls: fileUrls,
          status: "pending_review",
          total_reviewers: data.reviewers.length,
          current_reviewer_order: 1,
          submitted_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (docError) throw docError;

      // Create reviewers
      const reviewersData = data.reviewers.map((r) => ({
        document_id: document.id,
        reviewer_name: r.name,
        reviewer_email: r.email,
        reviewer_phone: r.phone,
        department: r.department,
        review_order: r.order,
        status: "pending",
      }));

      const { error: reviewersError } = await supabase
        .from("document_reviewers")
        .insert(reviewersData);

      if (reviewersError) throw reviewersError;

      // Add history entry
      await supabase.from("document_review_history").insert({
        document_id: document.id,
        action: "submitted",
        notes: `تم إرسال المستند للمراجعة من قبل ${data.senderName}`,
      });

      // Send notifications to first reviewer
      const firstReviewer = data.reviewers.find((r) => r.order === 1);
      if (firstReviewer?.phone || firstReviewer?.email) {
        try {
          await supabase.functions.invoke("send-notification", {
            body: {
              documentId: document.id,
              reviewerOrder: 1,
              type: "review_request",
            },
          });
        } catch (notifyError) {
          console.error("Notification error:", notifyError);
        }
      }

      return document;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["documents-stats"] });
    },
  });
};