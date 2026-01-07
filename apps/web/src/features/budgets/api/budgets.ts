import api from "@/utils/api";
import type { CreateBudgetFormData } from "../schemas/budget.schema";
import type { Budget } from "../types/budget";

export async function getBudgets(): Promise<Budget[]> {
	const response = await api<Budget[]>("api/budgets", {
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
