import api from "@/utils/api";
import type { TeamUserInvitation } from "../types/invitations";
import type {
	AddTeamMemberData,
	CreateRetroFromTeamData,
	CreateTeamData,
	Team,
	TeamMember,
	UpdateTeamData,
} from "../types/team";

// Get all user teams
export async function getTeams(): Promise<Team[]> {
	const response = await api("api/teams", {
		method: "GET",
	});

	return response as Team[];
}

// Get single team details
export async function getTeam(teamId: string): Promise<Team> {
	const response = await api(`api/teams/${teamId}`, {
		method: "GET",
	});

	return response as Team;
}

// Create new team
export async function createTeam(data: CreateTeamData): Promise<Team> {
	const response = await api("api/teams", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response as Team;
}

// Update team
export async function updateTeam(
	teamId: string,
	data: UpdateTeamData,
): Promise<Team> {
	const response = await api(`api/teams/${teamId}`, {
		method: "PUT",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response as Team;
}

// Delete team
export async function deleteTeam(teamId: string): Promise<void> {
	await api(`api/teams/${teamId}`, {
		method: "DELETE",
	});
}

// Get team members/participants
export async function getTeamMembers(teamId: string): Promise<TeamMember[]> {
	const response = await api(`api/teams/${teamId}/participants`, {
		method: "GET",
	});

	return response as TeamMember[];
}

// Add team member
export async function addTeamMember(
	teamId: string,
	data: AddTeamMemberData,
): Promise<TeamMember> {
	const response = await api(`api/teams/${teamId}/participants`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response as TeamMember;
}

// Remove team member
export async function removeTeamMember(
	teamId: string,
	userId: string,
): Promise<void> {
	await api(`api/teams/${teamId}/participants/${userId}`, {
		method: "DELETE",
	});
}

// Create retrospective from team
export async function createRetroFromTeam(
	teamId: string,
	data: CreateRetroFromTeamData,
): Promise<unknown> {
	const response = await api(`api/teams/${teamId}/retros`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
}

// Get invitations for current user
export async function getUserTeamInvitations(): Promise<TeamUserInvitation[]> {
	const response = await api("api/teams/invitations", {
		method: "GET",
	});
	return response as TeamUserInvitation[];
}

// Accept invitation for current user to join a team
export async function acceptTeamInvitation(teamId: string): Promise<void> {
	await api(`api/teams/${teamId}/invitations/accept`, {
		method: "POST",
	});
}

// Deny invitation for current user to join a team
export async function denyTeamInvitation(teamId: string): Promise<void> {
	await api(`api/teams/${teamId}/invitations/deny`, {
		method: "POST",
	});
}
