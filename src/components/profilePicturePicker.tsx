'use client'

import { ChangeEvent, useState } from 'react'

import { CloudinaryBase64ImageUpload } from '@/actions'

import { useUser } from '@/store/Store'
import { setAvatarUrl } from '@/store/StoreHelper'

import { Pencil } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import LoadingIndicator from './loadingIndicator'

export default function ProfilePictureUpload() {
	const [open, setOpen] = useState(false)
	const [isUploading, setIsUploading] = useState(false)

	const avatarUrl = useUser((state) => state.avatarUrl)
	const fullName = useUser((state) => state.fullName)

	const uploadPhotoToCloudinary = async (file: File): Promise<string> => {
		if (!fullName) {
			return ''
		}

		return new Promise((resolve, reject) => {
			const reader = new FileReader()

			const fileName = `${fullName.split(' ').join('_').toLowerCase()}_${
				self.crypto.randomUUID().split('-')[0]
			}`

			reader.onloadend = async () => {
				try {
					const url = await CloudinaryBase64ImageUpload({
						image: reader.result as string,
						folder: 'lifelytics_profile_pictures',
						publicId: fileName,
					})

					resolve(url)
				} catch (error) {
					console.error(error)
					reject(error)
				}
			}

			reader.readAsDataURL(file)
		})
	}

	const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
		setIsUploading(true)

		const file = event?.target?.files?.[0]

		if (!file) {
			return
		}

		const url = await uploadPhotoToCloudinary(file)
		setAvatarUrl({ avatarUrl: url })

		setIsUploading(false)
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="h-40 w-40 rounded-full">
					<div className="relative flex h-40 w-40 items-center justify-center rounded-full">
						<Avatar className="h-40 w-40">
							<AvatarImage src={avatarUrl ?? ''} alt={fullName} />
							<AvatarFallback className="bg-muted-foreground text-5xl text-white">
								<Pencil strokeWidth="3" size={36} />
							</AvatarFallback>
						</Avatar>
						<div className="absolute bottom-0 left-0 right-0 top-0 flex h-40 w-40 items-center justify-center rounded-full text-white opacity-0 hover:opacity-100">
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
								handleChange(event)
							}}
						/>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
