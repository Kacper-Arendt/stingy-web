import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getTeamStats } from "../api/getTeamStats";

export function useTeamStats(teamId: string) {
	return useQuery({
		queryKey: queryKeys.teams.stats(teamId),
		queryFn: () => getTeamStats(teamId),
		enabled: !!teamId,
	});
}
