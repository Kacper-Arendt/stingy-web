import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import { createBudget } from "../api/budgets";
import type { CreateBudgetFormData } from "../schemas/budget.schema";

export function useCreateBudget({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateBudgetFormData) => createBudget(data),
		onSuccess: (newBudget) => {
			queryClient.invalidateQueries({
				queryKey: teamKeys.lists(),
			});

			queryClient.invalidateQueries({
				queryKey: teamKeys.detail(newBudget.teamId),
			});

			onSuccess?.();
		},
		onError: (error) => onError?.(error),
	});
}
