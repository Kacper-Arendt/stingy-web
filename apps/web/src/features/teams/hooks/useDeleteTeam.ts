import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import { deleteTeam } from "../api/teams";

export function useDeleteTeam({
	teamId,
	onSuccess,
	onError,
}: {
	teamId: string;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => deleteTeam(teamId),
		onSuccess: () => {
			// Remove team from cache
			queryClient.removeQueries({
				queryKey: teamKeys.detail(teamId),
			});

			// Invalidate teams list to refresh
			queryClient.invalidateQueries({
				queryKey: teamKeys.lists(),
			});

			onSuccess?.();
		},
		onError: (error) => onError?.(error),
	});
}
