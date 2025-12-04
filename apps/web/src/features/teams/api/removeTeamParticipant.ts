import api from "@/utils/api";

export async function removeTeamParticipant(
	teamId: string,
	userId: string,
): Promise<void> {
	await api(`api/teams/${teamId}/participants/${userId}`, {
		method: "DELETE",
	});
}
