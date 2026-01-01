import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import { getUserTeamInvitations } from "../api/teams";
import type { TeamUserInvitation } from "../types/invitations";

export function useUserTeamInvitations() {
	return useQuery<TeamUserInvitation[]>({
		queryKey: queryKeys.retros.userInvitations(),
		queryFn: getUserTeamInvitations,
	});
}
