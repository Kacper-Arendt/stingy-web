import api from "@/utils/api";

export interface TeamRecentRetroDto {
	id: string;
	title: string;
	createdAt: string;
	status: "Planned" | "InProgress" | "Revealed" | "Finished";
	participantCount: number;
	notesCount: number;
}

export interface GetRecentRetrosParams {
	teamId: string;
	limit?: number;
}

export async function getRecentRetros({
	teamId,
	limit = 5,
}: GetRecentRetrosParams): Promise<TeamRecentRetroDto[]> {
	const response = await api(
		`api/teams/${teamId}/retros/recent?limit=${limit}`,
		{
			method: "GET",
		},
	);

	return response as TeamRecentRetroDto[];
}
