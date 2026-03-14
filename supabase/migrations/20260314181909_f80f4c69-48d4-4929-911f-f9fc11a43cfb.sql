CREATE TABLE public.sync_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sync_type text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  records_synced integer DEFAULT 0,
  error_message text,
  error_details jsonb,
  sync_details jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view sync logs"
  ON public.sync_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role can insert sync logs"
  ON public.sync_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);
