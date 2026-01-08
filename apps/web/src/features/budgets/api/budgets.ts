import api from "@/utils/api";
import type {
	CreateBudgetFormData,
	CreateYearFormData,
	UpdateYearFormData,
} from "../schemas/budget.schema";
import { type Budget, BudgetFilter, type BudgetYear } from "../types/budget";

export async function getBudgets(
	status: BudgetFilter = BudgetFilter.Active,
): Promise<Budget[]> {
	const response = await api<Budget[]>(`api/budgets?status=${status}`, {
		method: "GET",
	});

	return response;
}

export async function createBudget(
	data: CreateBudgetFormData,
): Promise<Budget> {
	const response = await api<Budget>("api/budgets", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response;
}

export async function createBudgetYear(
	budgetId: string,
	data: CreateYearFormData,
): Promise<BudgetYear> {
	const response = await api<BudgetYear>(`api/budgets/${budgetId}/years`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response;
}

export async function getBudgetYears(budgetId: string): Promise<BudgetYear[]> {
	const response = await api<BudgetYear[]>(`api/budgets/${budgetId}/years`, {
		method: "GET",
	});

	return response;
}

export async function getBudgetYearByValue(
	budgetId: string,
	value: number,
): Promise<BudgetYear> {
	const response = await api<BudgetYear>(
		`api/budgets/${budgetId}/years/${value}`,
		{
			method: "GET",
		},
	);

	return response;
}

export async function updateBudgetYear(
	budgetId: string,
	yearId: string,
	data: UpdateYearFormData,
): Promise<BudgetYear> {
	const response = await api<BudgetYear>(
		`api/budgets/${budgetId}/years/${yearId}`,
		{
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	return response;
}

export async function archiveBudgetYear(
	budgetId: string,
	yearId: string,
): Promise<void> {
	await api<void>(`api/budgets/${budgetId}/years/${yearId}/archive`, {
		method: "POST",
	});
}

export async function deleteBudgetYear(
	budgetId: string,
	yearId: string,
): Promise<void> {
	await api<void>(`api/budgets/${budgetId}/years/${yearId}`, {
		method: "DELETE",
	});
}
