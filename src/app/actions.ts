'use server';

import cloudinary from '@/lib/cloudinary';

interface CloudinaryBase64ImageUploadProps {
  image: string;
  folder: string;
  publicId: string;
}

export async function CloudinaryBase64ImageUpload({
  image,
  folder,
  publicId,
}: CloudinaryBase64ImageUploadProps): Promise<string> {
  return cloudinary.uploader
    .upload(image, {
      folder: folder,
      public_id: publicId,
    })
    .then((result) => {
      return result.url;
    });
}
