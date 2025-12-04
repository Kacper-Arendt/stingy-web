import { FormItem } from "@/components/ui/FormItem";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import * as m from "@/paraglide/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { sendProfileImage } from "../api/userProfile.api";
import {
	useCreateMyProfile,
	useMyProfile,
	useUpdateMyProfile,
} from "../hooks/useUserProfile";
import {
	type CreateProfileFormData,
	type UpdateProfileFormData,
	createProfileFormSchema,
	updateProfileFormSchema,
} from "../types/profileForm.schema";
import { ProfileVisibilityLevel } from "../types/userProfile";
import ImagePickModal from "./ImagePickModal";
import ProfileAvatar from "./ProfileAvatar";

interface ProfileEditProps {
	isCreating?: boolean;
	onSuccess?: () => void;
}

export default function ProfileEdit({
	isCreating = false,
	onSuccess,
}: ProfileEditProps) {
	const { data: profile, isLoading: isLoadingProfile } = useMyProfile();
	const updateMutation = useUpdateMyProfile();
	const createMutation = useCreateMyProfile();

	const isLoading = updateMutation.isPending || createMutation.isPending;

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<UpdateProfileFormData | CreateProfileFormData>({
		resolver: zodResolver(
			isCreating ? createProfileFormSchema() : updateProfileFormSchema(),
		),
		defaultValues: isCreating
			? {
					displayName: "",
					bio: "",
					timeZone: "Europe/Warsaw",
					visibility: ProfileVisibilityLevel.Public,
					profileImageUrl: "",
				}
			: {
					displayName: profile?.displayName || "",
					bio: profile?.bio || "",
					timeZone: profile?.timeZone || "Europe/Warsaw",
					visibility: profile?.visibility || ProfileVisibilityLevel.Public,
					profileImageUrl: profile?.profileImageUrl || "",
				},
	});

	const watchedValues = watch();
	const visibility = watch("visibility");
	const profileImageUrl = watch("profileImageUrl");

	const onSubmit = async (
		data: UpdateProfileFormData | CreateProfileFormData,
	) => {
		try {
			if (isCreating) {
				await createMutation.mutateAsync(data as CreateProfileFormData);
				toast.success(m.profile_create_success());
			} else {
				await updateMutation.mutateAsync(data as UpdateProfileFormData as any);
				toast.success(m.profile_save_success());
			}
			onSuccess?.();
		} catch (error) {
			if (isCreating) {
				toast.error(m.profile_create_error());
			} else {
				toast.error(m.profile_save_error());
			}
		}
	};

	if (!isCreating && isLoadingProfile) {
		return (
			<div className="flex items-center justify-center p-8">
				<div className="text-muted-foreground">{m.notes_loading()}</div>
			</div>
		);
	}

	return (
		<div className="max-w-2xl mx-auto space-y-6">
			{/* Header */}
			<div className="text-center space-y-2">
				<h1 className="text-2xl font-bold">
					{isCreating ? m.profile_create_title() : m.profile_edit_profile()}
				</h1>
				{isCreating && (
					<p className="text-muted-foreground">{m.profile_create_subtitle()}</p>
				)}
			</div>

			{/* Preview */}
			<div className="text-center space-y-4 p-6 border rounded-lg">
				<div>
					<ProfileAvatar
						displayName={watchedValues.displayName || "User"}
						profileImageUrl={profileImageUrl}
						useDefaultAvatar={!profileImageUrl}
						className="h-20 w-20 rounded-lg mx-auto"
						size={80}
					/>
					{profileImageUrl && (
						<Button
							variant="outline"
							size="icon"
							onClick={() => setValue("profileImageUrl", "")}
							title={m.profile_delete_image()}
						>
							<Trash2 className="w-4 h-4" />
						</Button>
					)}
					<ImagePickModal
						currentImageUrl={profileImageUrl}
						onImageChange={async (imageUrl) =>
							setValue(
								"profileImageUrl",
								(await sendProfileImage(imageUrl)).imageUrl,
							)
						}
					/>
				</div>
				<div>
					<h3 className="font-medium">{watchedValues.displayName || "User"}</h3>
					{watchedValues.bio && (
						<p className="text-sm text-muted-foreground mt-1">
							{watchedValues.bio}
						</p>
					)}
				</div>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
				{/* <FormItem
					id="timeZone"
					label={{ text: m.profile_timezone() }}
					errors={errors.timeZone?.message ? [errors.timeZone.message] : null}
				>
					<Select
						value={timeZone}
						onValueChange={(value) => setValue("timeZone", value)}
						disabled={isLoading}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select time zone" />
						</SelectTrigger>
						<SelectContent>
							{TIME_ZONES.map((tz) => (
								<SelectItem key={tz.value} value={tz.value}>
									{tz.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</FormItem> */}

				{/* Visibility */}
				<FormItem
					id="visibility"
					label={{ text: m.profile_visibility() }}
					errors={
						errors.visibility?.message ? [errors.visibility.message] : null
					}
				>
					<RadioGroup
						value={visibility?.toString()}
						onValueChange={(value) =>
							setValue("visibility", parseInt(value) as ProfileVisibilityLevel)
						}
						disabled={isLoading}
						className="space-y-3"
					>
						<div className="flex items-start space-x-3">
							<RadioGroupItem value="0" id="public" className="mt-1" />
							<div className="space-y-1">
								<Label htmlFor="public" className="font-medium">
									{m.profile_visibility_public()}
								</Label>
								<p className="text-sm text-muted-foreground">
									{m.profile_visibility_public_desc()}
								</p>
							</div>
						</div>
						<div className="flex items-start space-x-3">
							<RadioGroupItem value="1" id="limited" className="mt-1" />
							<div className="space-y-1">
								<Label htmlFor="limited" className="font-medium">
									{m.profile_visibility_limited()}
								</Label>
								<p className="text-sm text-muted-foreground">
									{m.profile_visibility_limited_desc()}
								</p>
							</div>
						</div>
						<div className="flex items-start space-x-3">
							<RadioGroupItem value="2" id="private" className="mt-1" />
							<div className="space-y-1">
								<Label htmlFor="private" className="font-medium">
									{m.profile_visibility_private()}
								</Label>
								<p className="text-sm text-muted-foreground">
									{m.profile_visibility_private_desc()}
								</p>
							</div>
						</div>
					</RadioGroup>
				</FormItem>

				{/* Submit Button */}
				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading
						? m.profile_saving()
						: isCreating
							? m.profile_create_button()
							: m.profile_save()}
				</Button>
			</form>
		</div>
	);
}
