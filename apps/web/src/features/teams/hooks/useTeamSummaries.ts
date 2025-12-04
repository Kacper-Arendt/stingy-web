import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getRetroSummary } from "../api/getSummary";

export function useTeamSummaries() {
	const params = useParams({ strict: false });

	return useQuery({
		queryKey: queryKeys.teams.summaries(params.teamId ?? ""),
		queryFn: () => getRetroSummary(params.teamId ?? ""),
		enabled: !!params.teamId,
		staleTime: 1000 * 60 * 60 * 1,
	});
}
