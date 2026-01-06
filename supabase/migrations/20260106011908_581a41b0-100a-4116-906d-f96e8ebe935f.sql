-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Storage policies for documents bucket
CREATE POLICY "Users can upload documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Document status enum
CREATE TYPE public.document_status AS ENUM (
  'draft',
  'pending_review',
  'needs_revision',
  'ready_for_approval',
  'approved',
  'rejected'
);

-- Documents table
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  sender_name TEXT NOT NULL,
  file_urls JSONB DEFAULT '[]'::jsonb,
  status document_status DEFAULT 'draft',
  current_reviewer_order INTEGER DEFAULT 1,
  total_reviewers INTEGER DEFAULT 0,
  submitted_at TIMESTAMP WITH TIME ZONE,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Document reviewers table
CREATE TABLE public.document_reviewers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  reviewer_phone TEXT,
  department TEXT NOT NULL,
  review_order INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'needs_revision')),
  notes TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  notified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.document_reviewers ENABLE ROW LEVEL SECURITY;

-- Document review history
CREATE TABLE public.document_review_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.document_reviewers(id) ON DELETE SET NULL,
  action TEXT NOT NULL CHECK (action IN ('submitted', 'approved', 'rejected', 'revision_requested', 'revised', 'notification_sent')),
  notes TEXT,
  notification_type TEXT CHECK (notification_type IN ('whatsapp', 'email', 'both')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.document_review_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for documents
CREATE POLICY "Users can view own documents"
ON public.documents FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create documents"
ON public.documents FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents"
ON public.documents FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents"
ON public.documents FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for document_reviewers
CREATE POLICY "Users can view reviewers of own documents"
ON public.document_reviewers FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.documents d
  WHERE d.id = document_id AND d.user_id = auth.uid()
));

CREATE POLICY "Users can add reviewers to own documents"
ON public.document_reviewers FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.documents d
  WHERE d.id = document_id AND d.user_id = auth.uid()
));

CREATE POLICY "Users can update reviewers of own documents"
ON public.document_reviewers FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.documents d
  WHERE d.id = document_id AND d.user_id = auth.uid()
));

CREATE POLICY "Users can delete reviewers of own documents"
ON public.document_reviewers FOR DELETE
USING (EXISTS (
  SELECT 1 FROM public.documents d
  WHERE d.id = document_id AND d.user_id = auth.uid()
));

-- RLS Policies for document_review_history
CREATE POLICY "Users can view history of own documents"
ON public.document_review_history FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.documents d
  WHERE d.id = document_id AND d.user_id = auth.uid()
));

CREATE POLICY "Users can add history to own documents"
ON public.document_review_history FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.documents d
  WHERE d.id = document_id AND d.user_id = auth.uid()
));

-- Triggers for updated_at
CREATE TRIGGER update_documents_updated_at
BEFORE UPDATE ON public.documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_document_reviewers_updated_at
BEFORE UPDATE ON public.document_reviewers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();