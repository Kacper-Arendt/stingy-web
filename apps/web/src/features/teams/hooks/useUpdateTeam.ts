import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import { updateTeam } from "../api/teams";
import type { UpdateTeamData } from "../types/team";

export function useUpdateTeam({
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
		mutationFn: (data: UpdateTeamData) => updateTeam(teamId, data),
		onSuccess: (updatedTeam) => {
			queryClient.setQueryData(teamKeys.detail(teamId), updatedTeam);

			queryClient.invalidateQueries({
				queryKey: teamKeys.lists(),
			});

			onSuccess?.();
		},
		onError: (error) => onError?.(error),
	});
}
