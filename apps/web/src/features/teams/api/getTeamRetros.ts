import api from "@/utils/api";

export interface RetrospectiveListItem {
	id: string;
	title: string;
	createdAt: string;
	status: "Planned" | "InProgress" | "Revealed" | "Finished";
}

export async function getTeamRetros(
	teamId: string,
): Promise<RetrospectiveListItem[]> {
	const response = await api(`api/teams/${teamId}/retros`, {
		method: "GET",
	});

	return response as RetrospectiveListItem[];
}
