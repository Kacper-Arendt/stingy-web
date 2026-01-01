import api from "@/utils/api";
import type { TeamUserInvitation } from "../types/invitations";
import type {
	AddTeamMemberData,
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

export async function deleteTeam(teamId: string): Promise<void> {
	await api(`api/teams/${teamId}`, {
		method: "DELETE",
	});
}

export async function getTeamMembers(teamId: string): Promise<TeamMember[]> {
	const response = await api(`api/teams/${teamId}/participants`, {
		method: "GET",
	});

	return response as TeamMember[];
}

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

export async function removeTeamMember(
	teamId: string,
	userId: string,
): Promise<void> {
	await api(`api/teams/${teamId}/participants/${userId}`, {
		method: "DELETE",
	});
}

export async function getUserTeamInvitations(): Promise<TeamUserInvitation[]> {
	const response = await api("api/teams/invitations", {
		method: "GET",
	});
	return response as TeamUserInvitation[];
}

export async function acceptTeamInvitation(teamId: string): Promise<void> {
	await api(`api/teams/${teamId}/invitations/accept`, {
		method: "POST",
	});
}

export async function denyTeamInvitation(teamId: string): Promise<void> {
	await api(`api/teams/${teamId}/invitations/deny`, {
		method: "POST",
	});
}
