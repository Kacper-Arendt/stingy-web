import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getRecentRetros } from "../api/getRecentRetros";

export function useRecentRetros(teamId: string, limit: number = 5) {
	return useQuery({
		queryKey: teamKeys.recentRetros(teamId, limit),
		queryFn: () => getRecentRetros({ teamId, limit }),
		staleTime: 2 * 60 * 1000, // 2 minutes
		// enabled: !!teamId,
	});
}
