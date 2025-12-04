import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as m from "@/paraglide/messages";
import { Pencil } from "lucide-react";
import { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";

export default function ImagePickModal({
	currentImageUrl,
	onImageChange,
}: {
	currentImageUrl: string | undefined;
	onImageChange: (imageFile: File) => void;
}) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(
		currentImageUrl || null,
	);
	const [isOpen, setIsOpen] = useState(false);

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			setPreviewUrl(URL.createObjectURL(file));
		}
	};

	const handleConfirm = () => {
		if (selectedFile) {
			onImageChange(selectedFile);
			setIsOpen(false);
		}
	};

	const handleCancel = () => {
		// Reset to original state
		setSelectedFile(null);
		setPreviewUrl(currentImageUrl || null);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon" title={m.profile_update_image()}>
					<Pencil className="w-4 h-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{m.profile_pick_image_title()}</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col items-center justify-center space-y-4">
					<ProfileAvatar
						displayName={""}
						profileImageUrl={previewUrl || undefined}
						useDefaultAvatar={true}
						className="h-24 w-24 rounded-lg mx-auto"
						size={96}
					/>

					<div className="w-full max-w-xs">
						<Input
							id="image-input"
							type="file"
							accept="image/*"
							onChange={handleFileSelect}
							className="cursor-pointer"
						/>
					</div>
				</div>
				<DialogFooter className="gap-2">
					<Button variant="outline" onClick={handleCancel}>
						{m.cancel()}
					</Button>
					<Button onClick={handleConfirm} disabled={!selectedFile}>
						{m.confirm()}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
