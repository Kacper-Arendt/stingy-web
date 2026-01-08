import { useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetKeys } from "@/integrations/tanstack-query/queryKeys";
import { createBudgetYear } from "../api/budgets";
import type { CreateYearFormData } from "../schemas/budget.schema";

export function useCreateBudgetYear({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			budgetId,
			data,
		}: {
			budgetId: string;
			data: CreateYearFormData;
		}) => createBudgetYear(budgetId, data),
		onSuccess: (_newYear, variables) => {
			queryClient.invalidateQueries({
				queryKey: budgetKeys.years(variables.budgetId),
			});

			onSuccess?.();
		},
		onError: (error) => onError?.(error),
	});
}
