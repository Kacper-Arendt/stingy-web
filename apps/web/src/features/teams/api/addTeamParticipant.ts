import api from "@/utils/api";

export interface AddParticipantRequest {
	email: string;
	role: number; // 0 = Owner, 1 = Admin, 2 = Member
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
