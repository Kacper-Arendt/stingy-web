export interface UserProfile {
	userId: string;
	displayName: string;
	profileImageUrl: string;
	bio?: string;
	timeZone: string;
	visibility: ProfileVisibilityLevel;
	useDefaultAvatar: boolean;
	defaultAvatarColor?: string;
	createdAt: string;
	lastModifiedAt: string;
}

export interface UserProfileStats {
	userId: string;
	displayName: string;
	retroCount: number;
	teamCount: number;
	noteCount: number;
	lastActivity: string;
}

export interface DefaultAvatarConfig {
	initials: string;
	backgroundColor: string;
	textColor: string;
}

export interface PublicProfile {
	userId: string;
	displayName: string;
	profileImageUrl?: string;
	bio?: string;
	useDefaultAvatar: boolean;
	defaultAvatarColor?: string;
	// Limited based on visibility settings
}

export enum ProfileVisibilityLevel {
	Public = 0,
	Limited = 1,
	Private = 2,
}

export interface CreateUserProfileRequest {
	displayName: string;
	profileImageUrl?: string;
	bio?: string;
	timeZone?: string;
	visibility?: ProfileVisibilityLevel;
}

export interface UpdateUserProfileRequest {
	displayName?: string;
	profileImageUrl: string | null;
	bio?: string;
	timeZone?: string;
	visibility?: ProfileVisibilityLevel;
}
