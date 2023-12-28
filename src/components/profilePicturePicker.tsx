'use client';

import { useState, ChangeEvent } from 'react';
import { useUser } from '@/contexts/UserContext';

import { CloudinaryBase64ImageUpload } from '../app/actions';

import LoadingIndicator from './loadingIndicator';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Pencil } from 'lucide-react';

export default function ProfilePictureUpload() {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { user, updateAvatarUrl } = useUser();

  const avatarUrl = user?.avatarUrl ?? '';
  const fullName = `${user?.firstName} ${user?.lastName}`;

  const uploadPhotoToCloudinary = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      const fileName = `${fullName.split(' ').join('_').toLowerCase()}_${
        self.crypto.randomUUID().split('-')[0]
      }`;

      reader.onloadend = async () => {
        try {
          const url = await CloudinaryBase64ImageUpload({
            image: reader.result as string,
            folder: 'lifelytics_profile_pictures',
            publicId: fileName,
          });

          resolve(url);
        } catch (error) {
          console.error(error);
          reject(error);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);

    const file = event?.target?.files?.[0];

    if (!file) {
      return;
    }

    const url = await uploadPhotoToCloudinary(file);
    updateAvatarUrl(url);

    setIsUploading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-40 w-40 rounded-full">
          <div className="w-40 h-40 rounded-full relative flex justify-center items-center">
            <Avatar className="h-40 w-40">
              <AvatarImage src={avatarUrl} alt={fullName} />
              <AvatarFallback className="text-5xl text-white bg-muted-foreground">
                <Pencil strokeWidth="3" size={36} />
              </AvatarFallback>
            </Avatar>
            <div className="w-40 h-40 rounded-full absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0 hover:opacity-100 text-white">
              <Pencil strokeWidth="3" size={36} />
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid w-full max-w-sm items-center gap-4">
          <Label htmlFor="image">
            {isUploading ? 'Uploading...' : 'Upload picture'}
          </Label>
          {isUploading ? (
            <LoadingIndicator size="sm" />
          ) : (
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(event) => {
                handleChange(event);
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
