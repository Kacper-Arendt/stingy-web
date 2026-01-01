import type { AuthorDto } from "@/types/author";
import api from "@/utils/api";

export interface TeamParticipant {
	userId: string;
	author: AuthorDto;
	email: string;
	role: string;
	status: string;
	joinedAt: string;
}

export interface AddParticipantRequest {
	email: string;
	role: number; // 0 = Owner, 1 = Admin, 2 = Member
}

export async function getTeamParticipants(
	teamId: string,
): Promise<TeamParticipant[]> {
	const response = await api(`api/teams/${teamId}/participants`, {
		method: "GET",
	});

	return response as TeamParticipant[];
}

export async function addTeamParticipant(
	teamId: string,
	request: AddParticipantRequest,
): Promise<void> {
	await api(`api/teams/${teamId}/participants`, {
		method: "POST",
		body: JSON.stringify(request),
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export async function removeTeamParticipant(
	teamId: string,
	userId: string,
): Promise<void> {
	await api(`api/teams/${teamId}/participants/${userId}`, {
		method: "DELETE",
	});
}
