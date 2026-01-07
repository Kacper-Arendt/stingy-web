export type BudgetMemberRole = "owner" | "admin" | "member";
export type BudgetMemberStatus = "active" | "pending" | "inactive";

export interface BudgetMember {
	userId: string;
	budgetId: string;
	email: string;
	role: BudgetMemberRole;
	status: BudgetMemberStatus;
	joinedAt: string;
}

export interface Budget {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	members: BudgetMember[];
}
