UPDATE storage.buckets
SET public = false
WHERE id IN ('avatars', 'card-images', 'connection-photos');

DROP POLICY IF EXISTS "Anyone can view card images" ON storage.objects;
DROP POLICY IF EXISTS "Connection photos are publicly viewable" ON storage.objects;
DROP POLICY IF EXISTS "Public can view avatars" ON storage.objects;

CREATE POLICY "Users can view own card images"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'card-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can view own connection photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'connection-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can view own avatars"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
