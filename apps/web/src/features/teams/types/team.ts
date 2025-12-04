import type { AuthorDto } from "@/types/author";

export interface TeamPermissions {
	canEditTeam: boolean;
	canDeleteTeam: boolean;
	canManageParticipants: boolean;
	canChangeUserRoles: boolean;
	canCreateRetro: boolean;
	canInviteUsers: boolean;
}

export interface Team {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	participants: TeamMember[];
	userRole: TeamRole;
	permissions?: TeamPermissions;
	memberCount: number;
	retroCount: number;
	lastRetroDate: string;
}

export interface TeamMember {
	id: string;
	userId: string;
	email: string;
	role: TeamRole;
	status: string;
	author: AuthorDto;
}

export type TeamRole = "owner" | "admin" | "member";

export interface CreateTeamData {
	name: string;
	description: string;
}

export interface UpdateTeamData {
	name: string;
	description: string;
}

export interface AddTeamMemberData {
	email: string;
	role: number; // API uses numbers: 1=owner, 2=admin, 3=member
}

export interface TeamStats {
	totalRetrospectives: number;
	totalNotes: number;
	peoplePerRetro: number;
	lastRetroDate: string;
}

export interface CreateRetroFromTeamData {
	title: string;
	revealAt: string;
}

// API Response types
export interface TeamApiResponse {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	// Add other fields returned by API
}

export interface TeamMemberApiResponse {
	id: string;
	email: string;
	role: number;
	// Add other fields returned by API
}

export interface TeamRetroSummary {
	retroId: string;
	retroName: string;
	summary: string;
	generatedAt: string;
	actionItems: string[];
	keyInsights: string[];
}
