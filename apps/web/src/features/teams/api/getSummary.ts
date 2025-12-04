import api from "@/utils/api";
import type { TeamRetroSummary } from "../types/team";

export async function getRetroSummary(
	teamId: string,
): Promise<TeamRetroSummary[]> {
	return api<TeamRetroSummary[]>(`api/teams/${teamId}/retros/summary`, {
		method: "GET",
	});
}
