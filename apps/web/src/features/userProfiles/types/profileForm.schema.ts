import { z } from "zod";
import { ProfileVisibilityLevel } from "./userProfile";

export const createProfileFormSchema = () =>
	z.object({
		displayName: z
			.string()
			.min(2, { message: "Display name must be at least 2 characters" })
			.max(50, { message: "Display name must be less than 50 characters" })
			.regex(/^[a-zA-Z0-9\s]+$/, {
				message: "Display name can only contain letters, numbers and spaces",
			}),
			
		profileImageUrl: z
			.string()
			.url({ message: "Invalid URL format" })
			.optional()
			.or(z.literal("")),

		bio: z
			.string()
			.max(500, { message: "Bio must be less than 500 characters" })
			.optional()
			.or(z.literal("")),

		timeZone: z
			.string()
			.min(1, { message: "Please select a time zone" })
			.optional(),

		visibility: z.nativeEnum(ProfileVisibilityLevel).optional(),
	});

export const updateProfileFormSchema = () =>
	z.object({
		displayName: z
			.string()
			.min(2, { message: "Display name must be at least 2 characters" })
			.max(50, { message: "Display name must be less than 50 characters" })
			.regex(/^[a-zA-Z0-9\s]+$/, {
				message: "Display name can only contain letters, numbers and spaces",
			})
			.optional(),

		profileImageUrl: z
			.string()
			.url({ message: "Invalid URL format" })
			.optional()
			.or(z.literal("")),

		bio: z
			.string()
			.max(500, { message: "Bio must be less than 500 characters" })
			.optional()
			.or(z.literal("")),

		timeZone: z
			.string()
			.min(1, { message: "Please select a time zone" })
			.optional(),

		visibility: z.nativeEnum(ProfileVisibilityLevel).optional(),
	});

export type CreateProfileFormData = z.infer<
	ReturnType<typeof createProfileFormSchema>
>;
export type UpdateProfileFormData = z.infer<
	ReturnType<typeof updateProfileFormSchema>
>;
