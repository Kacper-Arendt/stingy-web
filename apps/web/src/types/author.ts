export interface AuthorDto {
	userId: string;
	displayName: string;
	shortDisplayName: string;
	profileImageUrl?: string;
}

export interface UserDisplayInfo {
	userId: string;
	displayName: string;
	profileImageUrl?: string;
	hasProfile: boolean;
}
