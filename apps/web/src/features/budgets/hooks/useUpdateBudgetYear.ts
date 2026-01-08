import { useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetKeys } from "@/integrations/tanstack-query/queryKeys";
import { updateBudgetYear } from "../api/budgets";
import type { UpdateYearFormData } from "../schemas/budget.schema";

export function useUpdateBudgetYear({
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
			yearId,
			data,
		}: {
			budgetId: string;
			yearId: string;
			data: UpdateYearFormData;
		}) => updateBudgetYear(budgetId, yearId, data),
		onSuccess: (_updatedYear, variables) => {
			queryClient.invalidateQueries({
				queryKey: budgetKeys.years(variables.budgetId),
			});

			onSuccess?.();
		},
		onError: (error) => onError?.(error),
	});
}
