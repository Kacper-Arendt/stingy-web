import api from "@/utils/api";
import type {
	CreateUserProfileRequest,
	DefaultAvatarConfig,
	PublicProfile,
	UpdateUserProfileRequest,
	UserProfile,
	UserProfileStats,
} from "../types/userProfile";

export const sendProfileImage = async (
	image: File,
): Promise<{ imageUrl: string }> => {
	const formData = new FormData();
	formData.append("image", image);

	return api<{ imageUrl: string }>("api/profiles/me/image", {
		method: "POST",
		headers: { Accept: "application/json" },
		body: formData,
	});
};

export const getMyProfile = async (): Promise<UserProfile> => {
	return api<UserProfile>("api/profiles/me", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const createMyProfile = async (
	data: CreateUserProfileRequest,
): Promise<UserProfile> => {
	return api<UserProfile>("api/profiles/me", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};

export const updateMyProfile = async (
	data: UpdateUserProfileRequest,
): Promise<UserProfile> => {
	return api<UserProfile>("api/profiles/me", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};

export const getMyProfileStats = async (): Promise<UserProfileStats> => {
	return api<UserProfileStats>("api/profiles/me/stats", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const getMyDefaultAvatar = async (): Promise<DefaultAvatarConfig> => {
	return api<DefaultAvatarConfig>("api/profiles/me/default-avatar", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const getPublicProfile = async (
	userId: string,
): Promise<PublicProfile> => {
	return api<PublicProfile>(`api/profiles/${userId}/public`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const getUserDefaultAvatar = async (
	userId: string,
): Promise<DefaultAvatarConfig> => {
	return api<DefaultAvatarConfig>(`api/profiles/${userId}/default-avatar`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
};
