import { FormItem } from "@/components/ui/FormItem";
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
import { Textarea } from "@/components/ui/textarea";
import * as m from "@/paraglide/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { sendProfileImage } from "../api/userProfile.api";
import { useMyProfile, useUpdateMyProfile } from "../hooks/useUserProfile";
import ProfileAvatar from "./ProfileAvatar";

const profileFieldsSchema = z.object({
	displayName: z
		.string()
		.min(2, { message: "Display name must be at least 2 characters" })
		.max(50, { message: "Display name must be less than 50 characters" })
		.regex(/^[a-zA-Z0-9\s]+$/, {
			message: "Display name can only contain letters, numbers and spaces",
		}),
	bio: z
		.string()
		.max(500, { message: "Bio must be less than 500 characters" })
		.optional()
		.or(z.literal("")),
	timeZone: z
		.string()
		.min(1, { message: "Please select a time zone" })
		.optional(),
	profileImageUrl: z
		.string()
		.url({ message: "Invalid URL format" })
		.optional()
		.nullable(),
});

type ProfileFieldsData = z.infer<typeof profileFieldsSchema>;

interface ProfileFieldsModalProps {
	children?: React.ReactNode;
}

export default function ProfileFieldsModal({
	children,
}: ProfileFieldsModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [shouldDeleteImage, setShouldDeleteImage] = useState(false);
	const { data: profile } = useMyProfile();
	const updateMutation = useUpdateMyProfile();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ProfileFieldsData>({
		resolver: zodResolver(profileFieldsSchema),
		defaultValues: {
			displayName: profile?.displayName || "",
			bio: profile?.bio || "",
			timeZone: profile?.timeZone || "Europe/Warsaw",
		},
	});

	const onSubmit = async (data: ProfileFieldsData) => {
		try {
			let finalData = { ...data };

			// Handle image changes
			if (selectedFile) {
				// Upload new image
				const uploadResult = await sendProfileImage(selectedFile);
				finalData.profileImageUrl = uploadResult.imageUrl;
			} else if (shouldDeleteImage) {
				// Delete current image
				finalData.profileImageUrl = null;
			}

			// @ts-ignore
			await updateMutation.mutateAsync(finalData);
			toast.success(m.profile_save_success());
			handleClose();
		} catch (error) {
			toast.error(m.profile_save_error());
		}
	};

	const handleClose = () => {
		reset({
			displayName: profile?.displayName || "",
			bio: profile?.bio || "",
			timeZone: profile?.timeZone || "Europe/Warsaw",
		});
		setSelectedFile(null);
		setPreviewUrl(null);
		setShouldDeleteImage(false);
		setIsOpen(false);
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			setPreviewUrl(URL.createObjectURL(file));
			setShouldDeleteImage(false); // Reset delete flag when new file selected
		}
	};

	const handleMarkForDeletion = () => {
		setShouldDeleteImage(true);
		setSelectedFile(null);
		setPreviewUrl(null);
	};

	const isLoading = updateMutation.isPending;

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				{children || (
					<Button variant="outline" size="sm">
						<Edit className="w-4 h-4 mr-2" />
						{m.profile_edit_profile()}
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{m.profile_edit_profile()}</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* Avatar Section */}
					<div className="flex flex-col items-center space-y-4">
						<ProfileAvatar
							displayName={profile?.displayName || "User"}
							profileImageUrl={
								shouldDeleteImage
									? undefined
									: previewUrl || profile?.profileImageUrl
							}
							size={80}
						/>

						{shouldDeleteImage && (
							<p className="text-sm text-muted-foreground text-center">
								{m.profile_image_will_be_removed()}
							</p>
						)}

						<div className="flex items-center justify-center gap-2">
							{/* Hidden file input */}
							<input
								type="file"
								accept="image/*"
								onChange={handleFileSelect}
								disabled={isLoading}
								className="hidden"
								id="avatar-file-input"
							/>

							{/* Custom upload button */}
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() =>
									document.getElementById("avatar-file-input")?.click()
								}
								disabled={isLoading}
							>
								<Upload className="w-4 h-4 mr-2" />
								{selectedFile
									? m.profile_change_image()
									: m.profile_choose_image()}
							</Button>

							{/* Delete button */}
							{(profile?.profileImageUrl || selectedFile) &&
								!shouldDeleteImage && (
									<Button
										type="button"
										variant="destructive"
										size="sm"
										onClick={handleMarkForDeletion}
										disabled={isLoading}
									>
										<Trash2 className="w-4 h-4 mr-2" />
										{m.profile_remove_image_button()}
									</Button>
								)}

							{/* Undo delete button */}
							{shouldDeleteImage && (
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => setShouldDeleteImage(false)}
									disabled={isLoading}
								>
									<Edit className="w-4 h-4 mr-2" />
									{m.profile_undo_button()}
								</Button>
							)}
						</div>
					</div>
					{/* Display Name */}
					<FormItem
						id="displayName"
						label={{ text: m.profile_display_name(), required: true }}
						errors={
							errors.displayName?.message ? [errors.displayName.message] : null
						}
					>
						<Input
							{...register("displayName")}
							id="displayName"
							placeholder={m.profile_display_name_placeholder()}
							disabled={isLoading}
						/>
					</FormItem>

					{/* Bio */}
					<FormItem
						id="bio"
						label={{ text: m.profile_bio() }}
						errors={errors.bio?.message ? [errors.bio.message] : null}
					>
						<Textarea
							{...register("bio")}
							id="bio"
							placeholder={m.profile_bio_placeholder()}
							rows={3}
							disabled={isLoading}
						/>
					</FormItem>

					{/* Time Zone */}
					<FormItem
						id="timeZone"
						label={{ text: m.profile_timezone() }}
						errors={errors.timeZone?.message ? [errors.timeZone.message] : null}
					>
						<Input
							{...register("timeZone")}
							id="timeZone"
							placeholder="Europe/Warsaw"
							disabled={isLoading}
						/>
					</FormItem>

					<DialogFooter className="gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={handleClose}
							disabled={isLoading}
						>
							{m.cancel()}
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? m.profile_saving() : m.profile_save()}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
