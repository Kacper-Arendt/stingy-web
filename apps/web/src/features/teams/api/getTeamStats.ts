import api from "@/utils/api";
import type { TeamStats } from "../types/team";

export async function getTeamStats(teamId: string): Promise<TeamStats> {
	const response = await api(
		`api/teams/${teamId}/retros/dashboard/stats`,
		{
			method: "GET",
		},
	);

	return response as TeamStats;
}
