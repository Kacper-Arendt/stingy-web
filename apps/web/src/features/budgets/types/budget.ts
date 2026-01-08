export type BudgetMemberRole = "owner" | "admin" | "member";
export type BudgetMemberStatus = "active" | "pending" | "inactive";

export const BudgetFilter = {
	All: "All",
	Archived: "Archived",
	Active: "Active",
} as const;

export type BudgetFilter = (typeof BudgetFilter)[keyof typeof BudgetFilter];

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

export const YearStatus = {
	Active: "Active",
	Archived: "Archived",
} as const;

export type YearStatus = (typeof YearStatus)[keyof typeof YearStatus];

export interface BudgetYear {
	id: string;
	value: number;
	status: YearStatus;
	budgetId: string;
}
