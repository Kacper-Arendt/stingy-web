import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateTeam } from "../api/teams.api";
import type { UpdateTeamData } from "../types/team";

export function useUpdateTeam(teamId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdateTeamData) => updateTeam(teamId, data),
		onSuccess: (updatedTeam) => {
			queryClient.setQueryData(teamKeys.detail(teamId), updatedTeam);

			queryClient.invalidateQueries({
				queryKey: teamKeys.lists(),
			});

			toast.success("Team updated successfully");
		},
		onError: () => {
			const errorMessage = "Failed to update team";
			toast.error(errorMessage);
		},
	});
}
