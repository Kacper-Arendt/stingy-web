import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getTeamParticipants } from "../api/getTeamParticipants";

export function useTeamParticipants(teamId: string) {
	return useQuery({
		queryKey: queryKeys.teams.participants(teamId),
		queryFn: () => getTeamParticipants(teamId),
		enabled: !!teamId,
		staleTime: 300 * 1000, // 5 minutes
	});
}
