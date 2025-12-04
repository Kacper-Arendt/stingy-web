export interface TeamUserInvitation {
	teamId: string;
	teamName: string;
	email: string;
	role: string; // e.g., "Owner" | "Admin" | "Member"
	invitedAt: string; // ISO string
}
