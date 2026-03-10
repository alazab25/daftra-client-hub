
-- Fix 1: Prevent privilege escalation - restrict role changes on profiles
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid() AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()));

-- Fix 2: Restrict INSERT on profiles to prevent setting admin role
DROP POLICY IF EXISTS "Allow users to insert new profiles" ON public.profiles;
CREATE POLICY "Allow users to insert new profiles"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND role = 'user');

-- Fix 3: Secure kv_store_cf418985 - remove public SELECT
DROP POLICY IF EXISTS "Enable read access for all users" ON public.kv_store_cf418985;
CREATE POLICY "Only admins can read kv_store_cf418985"
  ON public.kv_store_cf418985 FOR SELECT TO authenticated
  USING (is_admin_user());

-- Fix 4: Secure kv_store_2fc8ebc4 - remove public SELECT (contains admin codes!)
DROP POLICY IF EXISTS "Enable read access for all user" ON public.kv_store_2fc8ebc4;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.kv_store_2fc8ebc4;
CREATE POLICY "Only admins can read kv_store_2fc8ebc4"
  ON public.kv_store_2fc8ebc4 FOR SELECT TO authenticated
  USING (is_admin_user());
