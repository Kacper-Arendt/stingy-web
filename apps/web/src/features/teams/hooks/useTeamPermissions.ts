import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import { getTeamPermissions } from "../api/teamPermissions";

export function useTeamPermissions(teamId: string) {
	return useQuery({
		queryKey: queryKeys.teams.permissions(teamId),
		queryFn: () => getTeamPermissions(teamId),
		enabled: !!teamId,
		staleTime: 60 * 1000, // 1 minute - matches backend cache TTL
	});
}
