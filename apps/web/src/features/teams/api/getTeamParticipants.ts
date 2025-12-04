import api from "@/utils/api";
import type { AuthorDto } from "@/types/author";

export interface TeamParticipant {
	userId: string;
	author: AuthorDto;
	email: string;
	role: string;
	status: string;
	joinedAt: string;
}

export async function getTeamParticipants(
	teamId: string,
): Promise<TeamParticipant[]> {
	const response = await api(`api/teams/${teamId}/participants`, {
		method: "GET",
	});

	return response as TeamParticipant[];
}
