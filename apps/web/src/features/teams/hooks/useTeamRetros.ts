import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getTeamRetros } from "../api/getTeamRetros";

export function useTeamRetros(teamId: string) {
	return useQuery({
		queryKey: teamKeys.retros(teamId),
		queryFn: () => getTeamRetros(teamId),
		staleTime: 2 * 60 * 1000, // 2 minutes
		enabled: !!teamId,
	});
}
