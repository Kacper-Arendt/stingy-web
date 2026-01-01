import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import { removeTeamParticipant } from "../api/teamParticipants.api";

export function useRemoveTeamParticipant({
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
		mutationFn: (userId: string) => removeTeamParticipant(teamId, userId),
		onSuccess: () => {
			// Invalidate team participants
			queryClient.invalidateQueries({
				queryKey: queryKeys.teams.participants(teamId),
			});

			// Invalidate team details to refresh member count
			queryClient.invalidateQueries({
				queryKey: queryKeys.teams.detail(teamId),
			});

			onSuccess?.();
		},
		onError: (error) => onError?.(error),
	});
}
