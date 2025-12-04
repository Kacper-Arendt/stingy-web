import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import * as m from "@/paraglide/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createTeam } from "../api/teams.api";

export function useCreateTeam() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTeam,
		onSuccess: (newTeam) => {
			queryClient.invalidateQueries({
				queryKey: teamKeys.lists(),
			});

			queryClient.setQueryData(teamKeys.detail(newTeam.id), newTeam);

			toast.success(m.created());
		},
		onError: () => {
			toast.error(m.created_error());
		},
	});
}
