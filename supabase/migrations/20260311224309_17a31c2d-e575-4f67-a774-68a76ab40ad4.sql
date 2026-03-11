
-- Create storage bucket for connection photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('connection-photos', 'connection-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload their own connection photos
CREATE POLICY "Users can upload connection photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'connection-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow anyone to view connection photos (public bucket)
CREATE POLICY "Connection photos are publicly viewable"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'connection-photos');

-- Allow users to update their own connection photos
CREATE POLICY "Users can update own connection photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'connection-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow users to delete their own connection photos
CREATE POLICY "Users can delete own connection photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'connection-photos' AND (storage.foldername(name))[1] = auth.uid()::text);
