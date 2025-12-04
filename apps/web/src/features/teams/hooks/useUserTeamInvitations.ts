import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	acceptTeamInvitation,
	denyTeamInvitation,
	getUserTeamInvitations,
} from "../api/teams.api";
import type { TeamUserInvitation } from "../types/invitations";

export function useUserTeamInvitations() {
	const queryClient = useQueryClient();

	const invitationsQuery = useQuery<TeamUserInvitation[]>({
		queryKey: queryKeys.retros.userInvitations(),
		queryFn: getUserTeamInvitations,
	});

	const acceptInvitationMutation = useMutation({
		mutationFn: (teamId: string) => acceptTeamInvitation(teamId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.retros.userInvitations(),
			});
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.lists() });
		},
	});

	const denyInvitationMutation = useMutation({
		mutationFn: (teamId: string) => denyTeamInvitation(teamId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.retros.userInvitations(),
			});
			queryClient.invalidateQueries({ queryKey: queryKeys.teams.lists() });
		},
	});

	return {
		...invitationsQuery,
		acceptInvitation: acceptInvitationMutation.mutateAsync,
		isAccepting: acceptInvitationMutation.isPending,
		denyInvitation: denyInvitationMutation.mutateAsync,
		isDenying: denyInvitationMutation.isPending,
	};
}
