import type { Budget } from "@/features/budgets/types/budget";
import type { AuthorDto } from "@/types/author";

export interface TeamPermissions {
	canEditTeam: boolean;
	canDeleteTeam: boolean;
	canManageParticipants: boolean;
	canChangeUserRoles: boolean;
	canInviteUsers: boolean;
}

export interface Team {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	participants: TeamMember[];
	userRole: TeamRole;
	permissions?: TeamPermissions;
	memberCount: number;
	budgets?: Budget[];
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

// API Response types
export interface TeamApiResponse {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
}

export interface TeamMemberApiResponse {
	id: string;
	email: string;
	role: number;
}
