import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import { createTeam } from "../api/teams";

export function useCreateTeam({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTeam,
		onSuccess: (newTeam) => {
			queryClient.invalidateQueries({
				queryKey: teamKeys.lists(),
			});

			queryClient.setQueryData(teamKeys.detail(newTeam.id), newTeam);

			onSuccess?.();
		},
		onError: (error) => onError?.(error),
	});
}
