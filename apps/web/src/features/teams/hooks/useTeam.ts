import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getTeam } from "../api/teams.api";

export function useTeam(teamId: string) {
	return useQuery({
		queryKey: teamKeys.detail(teamId),
		queryFn: () => getTeam(teamId),
		enabled: !!teamId,
		staleTime: 3 * 60 * 1000, // 3 minutes
	});
}
