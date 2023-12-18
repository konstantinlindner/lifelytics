import { Input } from '@/components/ui/input';

export default function ProfilePictureUpload() {
  return (
    <div>
      <p>Upload a profile image</p>
      <div className="w-full lg:max-w-sm items-center">
        <Input id="image-upload" type="file" />
      </div>
    </div>
  );
}
