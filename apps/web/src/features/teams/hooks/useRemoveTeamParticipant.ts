import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import * as m from "@/paraglide/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeTeamParticipant } from "../api/removeTeamParticipant";

export function useRemoveTeamParticipant(teamId: string) {
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

			toast.success(m.teams_participant_removed_success());
		},
		onError: (error) => {
			const errorMessage =
				error instanceof Error
					? error.message
					: m.teams_participant_removed_error();
			toast.error(errorMessage);
		},
	});
}
