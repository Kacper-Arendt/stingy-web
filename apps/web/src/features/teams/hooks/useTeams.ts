import { useQuery } from "@tanstack/react-query";
import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import { getTeams } from "../api/teams";

export function useTeams() {
	return useQuery({
		queryKey: teamKeys.lists(),
		queryFn: getTeams,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}
