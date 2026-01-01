import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import { getTeamParticipants } from "../api/teamParticipants.api";

export function useTeamParticipants(teamId: string) {
	return useQuery({
		queryKey: queryKeys.teams.participants(teamId),
		queryFn: () => getTeamParticipants(teamId),
		enabled: !!teamId,
		staleTime: 300 * 1000, // 5 minutes
	});
}
