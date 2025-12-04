import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";


export function useLeaveTeam(teamId: string) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async () => {
			// For leaving a team, we remove ourselves from the team
			// We'll need the current user ID - this should come from the auth context
			// For now, we'll use a placeholder API call
			const response = await fetch(`/api/teams/${teamId}/leave`, {
				method: "POST",
			});

			if (!response.ok) {
				throw new Error("Failed to leave team");
			}
		},
		onSuccess: () => {
			// Remove team from cache
			queryClient.removeQueries({
				queryKey: teamKeys.detail(teamId),
			});

			// Invalidate teams list to refresh
			queryClient.invalidateQueries({
				queryKey: teamKeys.lists(),
			});

			toast.success("Successfully left the team");

			// Navigate back to teams list
			navigate({ to: "/" });
		},
		onError: (error) => {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to leave team";
			toast.error(errorMessage);
		},
	});
}
