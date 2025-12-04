import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import * as m from "@/paraglide/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	type CreateTeamRetroRequest,
	createTeamRetro,
} from "../api/createTeamRetro";

export function useCreateTeamRetro(teamId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateTeamRetroRequest) =>
			createTeamRetro({ teamId, data }),

		onSuccess: (result) => {
			// Invalidate recent retros to refresh the list
			queryClient.invalidateQueries({
				queryKey: teamKeys.recentRetros(teamId),
			});

			// Also invalidate team details to update any aggregated data
			queryClient.invalidateQueries({
				queryKey: teamKeys.detail(teamId),
			});

			toast.success(m.teams_retro_created_success());

			return result;
		},

		onError: () => {
			toast.error(m.teams_retro_created_error);
		},
	});
}
