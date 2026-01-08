import { useQuery } from "@tanstack/react-query";
import { budgetKeys } from "@/integrations/tanstack-query/queryKeys";
import { getBudgetYears } from "../api/budgets";

export function useBudgetYears(budgetId: string) {
	return useQuery({
		queryKey: budgetKeys.years(budgetId),
		queryFn: () => getBudgetYears(budgetId),
	});
}
