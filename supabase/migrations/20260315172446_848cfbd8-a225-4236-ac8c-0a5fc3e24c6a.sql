-- Add UPDATE and DELETE policies for category_images table
CREATE POLICY "Authenticated can update category images"
ON public.category_images
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated can delete category images"
ON public.category_images
FOR DELETE
TO authenticated
USING (true);

-- Add DELETE policy for category-images storage bucket
CREATE POLICY "Authenticated delete category images storage"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'category-images');