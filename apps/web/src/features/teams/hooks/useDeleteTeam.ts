import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { deleteTeam } from "../api/teams.api";

export function useDeleteTeam(teamId: string) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

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

			toast.success("Team deleted successfully");

			// Navigate back to teams list
			navigate({ to: "/" });
		},
		onError: () => {
			const errorMessage = "Failed to delete team";
			toast.error(errorMessage);
		},
	});
}
