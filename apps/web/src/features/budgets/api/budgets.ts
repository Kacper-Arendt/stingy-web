import api from "@/utils/api";
import type { CreateBudgetFormData } from "../schemas/budget.schema";
import type { Budget } from "../types/budget";

export async function createBudget(
	data: CreateBudgetFormData,
): Promise<Budget> {
	const response = await api("api/budgets", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response as Budget;
}
