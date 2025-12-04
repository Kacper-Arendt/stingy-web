import { SomethingWentWrong } from "@/components/blocks/SomethinWentWrong";
import { SummaryBlocks } from "@/components/blocks/SummaryBlocks";
import { Skeleton } from "@/components/ui/skeleton";
import * as m from "@/paraglide/messages";
import { useTeamSummaries } from "../hooks/useTeamSummaries";

export function RetroSummaries() {
	const { data: summaries, isLoading } = useTeamSummaries();

	if (isLoading) return <Skeleton className="h-[125px] w-full rounded-xl" />;

	if (!summaries)
		return <SomethingWentWrong description={m.teams_summaries_not_found()} />;

	return (
		<div>
			{summaries.map((summary) => (
				<SummaryBlocks
					key={summary.retroId}
					title={summary.retroName}
					mainSummary={summary.summary}
					actionItems={summary.actionItems}
					keyInsights={summary.keyInsights}
				/>
			))}
		</div>
	);
}
