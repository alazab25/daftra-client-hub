-- Create notification_templates table
CREATE TABLE IF NOT EXISTS public.notification_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_key text NOT NULL UNIQUE,
  template_name text NOT NULL,
  header_text text NULL,
  body_text text NOT NULL,
  footer_text text NULL,
  buttons jsonb NOT NULL DEFAULT '[]'::jsonb,
  variables jsonb NOT NULL DEFAULT '[]'::jsonb,
  language text NULL DEFAULT 'ar',
  event_type text NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notification_templates ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Authenticated users can view templates"
  ON public.notification_templates FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert templates"
  ON public.notification_templates FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update templates"
  ON public.notification_templates FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete templates"
  ON public.notification_templates FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  project_id uuid NULL REFERENCES public.projects(id),
  title text NOT NULL,
  description text NULL,
  sender_name text NULL,
  file_urls text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'pending_review',
  total_reviewers integer NOT NULL DEFAULT 0,
  current_reviewer_order integer NOT NULL DEFAULT 1,
  submitted_at timestamp with time zone NULL,
  approved_at timestamp with time zone NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their documents"
  ON public.documents FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their documents"
  ON public.documents FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their documents"
  ON public.documents FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Create document_reviewers table
CREATE TABLE IF NOT EXISTS public.document_reviewers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id uuid NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  reviewer_name text NOT NULL,
  reviewer_email text NULL,
  reviewer_phone text NULL,
  department text NULL,
  review_order integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'pending',
  reviewed_at timestamp with time zone NULL,
  notes text NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.document_reviewers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view document reviewers"
  ON public.document_reviewers FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert document reviewers"
  ON public.document_reviewers FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update document reviewers"
  ON public.document_reviewers FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Create document_review_history table
CREATE TABLE IF NOT EXISTS public.document_review_history (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id uuid NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  reviewer_id uuid NULL REFERENCES public.document_reviewers(id),
  action text NOT NULL,
  notes text NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.document_review_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view document history"
  ON public.document_review_history FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert document history"
  ON public.document_review_history FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;