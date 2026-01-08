import { useQuery } from "@tanstack/react-query";
import { budgetKeys } from "@/integrations/tanstack-query/queryKeys";
import { getBudgets } from "../api/budgets";
import { BudgetFilter } from "../types/budget";

export function useBudgets(status: BudgetFilter = BudgetFilter.Active) {
	return useQuery({
		queryKey: budgetKeys.list({ status }),
		queryFn: () => getBudgets(status),
	});
}
