import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import { acceptTeamInvitation, denyTeamInvitation } from "../api/teams";

export function useTeamInvitationActions({
	onAcceptSuccess,
	onAcceptError,
	onDenySuccess,
	onDenyError,
}: {
	onAcceptSuccess?: () => void;
	onAcceptError?: (error: Error) => void;
	onDenySuccess?: () => void;
	onDenyError?: (error: Error) => void;
} = {}) {
	const queryClient = useQueryClient();

	const acceptInvitationMutation = useMutation({
		mutationFn: (teamId: string) => acceptTeamInvitation(teamId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.retros.userInvitations(),
			});
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.lists() });
			onAcceptSuccess?.();
		},
		onError: (error) => onAcceptError?.(error),
	});

	const denyInvitationMutation = useMutation({
		mutationFn: (teamId: string) => denyTeamInvitation(teamId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.retros.userInvitations(),
			});
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.lists() });
			onDenySuccess?.();
		},
		onError: (error) => onDenyError?.(error),
	});

	return {
		acceptInvitation: acceptInvitationMutation.mutateAsync,
		isAccepting: acceptInvitationMutation.isPending,
		denyInvitation: denyInvitationMutation.mutateAsync,
		isDenying: denyInvitationMutation.isPending,
	};
}
