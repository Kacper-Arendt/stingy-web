import api from "@/utils/api";

export interface CreateColumnDto {
	title: string;
	color: string;
	order: number;
}

export interface CreateTeamRetroRequest {
	title: string;
	revealAt?: string;
	columns?: CreateColumnDto[];
}

export interface CreateTeamRetroParams {
	teamId: string;
	data: CreateTeamRetroRequest;
}

export async function createTeamRetro({
	teamId,
	data,
}: CreateTeamRetroParams): Promise<{ id: string }> {
	const response = await api(`api/teams/${teamId}/retros`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response as { id: string };
}
