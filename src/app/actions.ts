'use server';

import cloudinary from '@/lib/cloudinary';

export async function CloudinaryBase64ImageUpload(
  image: string,
  options: { folder: string; publicId: string },
) {
  cloudinary.uploader.upload(image, {
    folder: options.folder,
    public_id: options.publicId,
  });
}
