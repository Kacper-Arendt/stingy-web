import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getTeamPermissions } from "../api/getTeamPermissions";

export function useTeamPermissions(teamId: string) {
	return useQuery({
		queryKey: queryKeys.teams.permissions(teamId),
		queryFn: () => getTeamPermissions(teamId),
		enabled: !!teamId,
		staleTime: 60 * 1000, // 1 minute - matches backend cache TTL
	});
}
