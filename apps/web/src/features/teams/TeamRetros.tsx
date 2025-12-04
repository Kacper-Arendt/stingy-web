import { SomethingWentWrong } from "@/components/blocks/SomethinWentWrong";
import { Skeleton } from "@/components/ui/skeleton";
import * as m from "@/paraglide/messages";
import { useDate } from "@/utils/useDate";
import { Link } from "@tanstack/react-router";
import { Calendar, ExternalLink } from "lucide-react";
import { RetroStatusBadge } from "./components/RetroStatusBadge";
import { useTeamRetros } from "./hooks/useTeamRetros";

export function TeamRetros({ teamId }: { teamId: string }) {
	const { data: retrospectives, isLoading, error } = useTeamRetros(teamId);
	const { defaultFormatDate } = useDate();

	if (isLoading) {
		return (
			<div className="container max-w-6xl mx-auto py-8 mt-2">
				<Skeleton className="h-25 w-full rounded-lg mb-4" />
				<Skeleton className="h-25 w-full rounded-lg mb-4" />
				<Skeleton className="h-25 w-full rounded-lg mb-4" />
				<Skeleton className="h-25 w-full rounded-lg mb-4" />
			</div>
		);
	}

	if (error)
		return (
			<SomethingWentWrong
				description={m.teams_all_retros_error()}
				className="mt-10"
			/>
		);

	return (
		<div className="container max-w-6xl mx-auto py-8 px-4">
			{/* Header */}
			<div className="mb-8">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold">{m.teams_all_retros_title()}</h1>
						<p className="text-muted-foreground mt-2">
							{retrospectives && retrospectives.length > 0
								? m.teams_all_retros_count({ count: retrospectives.length })
								: m.teams_all_retros_none()}
						</p>
					</div>
				</div>
			</div>

			{/* Retrospectives List */}
			{retrospectives && retrospectives.length > 0 ? (
				<div className="grid grid-cols-1 gap-4">
					{retrospectives.map((retro) => (
						<div
							key={retro.id}
							className="bg-card border rounded-lg p-6 hover:bg-muted/50 transition-colors"
						>
							<div className="flex items-start justify-between">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-3 mb-3">
										<Link
											to="/teams/$teamId/retros/$retroId"
											params={{ teamId, retroId: retro.id }}
											className="text-xl font-semibold text-foreground hover:text-primary transition-colors truncate"
										>
											{retro.title}
										</Link>
										<RetroStatusBadge status={retro.status} />
										<Link
											to="/teams/$teamId/retros/$retroId"
											params={{ teamId, retroId: retro.id }}
											className="text-muted-foreground hover:text-foreground transition-colors ml-auto"
										>
											<ExternalLink className="w-5 h-5" />
										</Link>
									</div>

									<div className="flex items-center gap-6 text-sm text-muted-foreground">
										<div className="flex items-center gap-2">
											<Calendar className="w-4 h-4" />
											<span>
												{defaultFormatDate(new Date(retro.createdAt))}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="bg-card border rounded-lg p-12 text-center">
					<div className="text-8xl mb-6">🦥</div>
					<h3 className="text-2xl font-semibold mb-4">
						{m.teams_all_retros_empty_title()}
					</h3>
				</div>
			)}
		</div>
	);
}
