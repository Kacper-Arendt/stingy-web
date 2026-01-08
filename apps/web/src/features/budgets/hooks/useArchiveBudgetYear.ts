import { useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetKeys } from "@/integrations/tanstack-query/queryKeys";
import { archiveBudgetYear } from "../api/budgets";

export function useArchiveBudgetYear({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ budgetId, yearId }: { budgetId: string; yearId: string }) =>
			archiveBudgetYear(budgetId, yearId),
		onSuccess: (_result, variables) => {
			queryClient.invalidateQueries({
				queryKey: budgetKeys.years(variables.budgetId),
			});

			onSuccess?.();
		},
		onError: (error) => onError?.(error),
	});
}
