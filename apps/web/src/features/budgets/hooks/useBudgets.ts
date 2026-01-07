import { useQuery } from "@tanstack/react-query";
import { budgetKeys } from "@/integrations/tanstack-query/queryKeys";
import { getBudgets } from "../api/budgets";

export function useBudgets() {
	return useQuery({
		queryKey: budgetKeys.list(),
		queryFn: () => getBudgets(),
	});
}
