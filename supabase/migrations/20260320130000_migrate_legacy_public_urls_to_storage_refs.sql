CREATE OR REPLACE FUNCTION public.public_storage_url_to_ref(p_value text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  bucket text;
  object_path text;
  matches text[];
BEGIN
  IF p_value IS NULL OR p_value = '' THEN
    RETURN p_value;
  END IF;

  IF p_value LIKE 'storage://%' THEN
    RETURN p_value;
  END IF;

  matches := regexp_match(
    p_value,
    '/storage/v1/object/(?:public|sign)/([^/?#]+)/([^?#]+)'
  );

  IF matches IS NULL OR array_length(matches, 1) < 2 THEN
    RETURN p_value;
  END IF;

  bucket := matches[1];
  object_path := regexp_replace(matches[2], '%2F', '/', 'gi');
  object_path := regexp_replace(object_path, '\?.*$', '');

  IF bucket IN ('avatars', 'card-images', 'connection-photos') THEN
    RETURN 'storage://' || bucket || '/' || object_path;
  END IF;

  RETURN p_value;
END;
$$;

UPDATE public.profiles
SET avatar_url = public.public_storage_url_to_ref(avatar_url)
WHERE avatar_url IS NOT NULL
  AND avatar_url NOT LIKE 'storage://%';

UPDATE public.card_entries
SET image_url = public.public_storage_url_to_ref(image_url)
WHERE image_url IS NOT NULL
  AND image_url NOT LIKE 'storage://%';

UPDATE public.couples
SET photo_url = public.public_storage_url_to_ref(photo_url)
WHERE photo_url IS NOT NULL
  AND photo_url NOT LIKE 'storage://%';
