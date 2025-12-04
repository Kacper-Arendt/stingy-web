import api from "@/utils/api";
import type { TeamPermissions } from "../types/team";

export async function getTeamPermissions(
	teamId: string,
): Promise<TeamPermissions> {
	const response = await api(`api/teams/${teamId}/permissions`, {
		method: "GET",
	});

	return response as TeamPermissions;
}
