import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { resolveStorageUrl } from "@/lib/storageRefs";
import { uploadMyGoTwoCardImage } from "@/features/mygotwo/myGoTwoData";

export function useMyGoTwoImageField(
  imageUrl: string | undefined,
  onImageChange: (imageUrl: string) => void,
) {
  const { toast } = useToast();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [resolvedImageUrl, setResolvedImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;

    const loadImage = async () => {
      const resolved = await resolveStorageUrl(imageUrl);
      if (!cancelled) setResolvedImageUrl(resolved || "");
    };

    loadImage();
    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please choose an image file.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image too large", description: "Please choose an image under 5MB.", variant: "destructive" });
      return;
    }

    setUploadingImage(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Please sign in to upload photos.");

      const storageRef = await uploadMyGoTwoCardImage(user.id, file);
      onImageChange(storageRef);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Could not upload image.";
      toast({ title: "Upload failed", description: message, variant: "destructive" });
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return {
    fileInputRef,
    resolvedImageUrl,
    uploadingImage,
    handleImageUpload,
  };
}
