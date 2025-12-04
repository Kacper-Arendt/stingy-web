import { NoItems } from "@/components/blocks/NoItems";
import { Button } from "@/components/ui/button";
import * as m from "@/paraglide/messages";
import { useDate } from "@/utils/useDate";
import { Link } from "@tanstack/react-router";
import { Calendar, MessageSquare, Plus, Users } from "lucide-react";
import { useState } from "react";
import { useRecentRetros } from "../hooks/useRecentRetros";
import { CreateRetroModal } from "./CreateRetroModal";
import { RetroStatusBadge } from "./RetroStatusBadge";

interface RecentRetrosProps {
	teamId: string;
	canCreateRetro: boolean;
	limit?: number;
}

export function RecentRetros({
	teamId,
	canCreateRetro,
	limit = 5,
}: RecentRetrosProps) {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const {
		data: recentRetros,
		isLoading,
		error,
	} = useRecentRetros(teamId, limit);
	const { defaultFormatDate } = useDate();

	if (isLoading) {
		return (
			<div className="bg-card border rounded-lg p-6">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-semibold">
						{m.teams_recent_retros_title()}
					</h3>
				</div>
				<div className="animate-pulse space-y-3">
					{Array.from({ length: 3 }, (_, i) => (
						<div key={i} className="h-16 bg-muted rounded" />
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-card border rounded-lg p-6">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-semibold">
						{m.teams_recent_retros_title()}
					</h3>
				</div>
				<div className="text-center py-8">
					<p className="text-destructive">{m.teams_recent_retros_error()}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-card border border-border rounded-lg p-6">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<div>
					<h3 className="text-lg font-semibold">
						{m.teams_recent_retros_title()}
					</h3>
				</div>
				{canCreateRetro && (
					<Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
						<Plus className="w-4 h-4" />
						{m.teams_create_retro_button()}
					</Button>
				)}
			</div>

			{/* Retrospectives List */}
			{recentRetros && recentRetros?.length > 0 ? (
				<div className="space-y-3">
					{recentRetros.map((retro) => (
						<div
							key={retro.id}
							className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
						>
							<div className="flex items-start justify-between">
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-3 mb-2">
										<Link
											to="/teams/$teamId/retros/$retroId"
											params={{ teamId, retroId: retro.id }}
											className="font-medium text-foreground hover:text-primary transition-colors truncate"
										>
											{retro.title}
										</Link>
										<RetroStatusBadge status={retro.status} />
									</div>

									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<Calendar className="w-3 h-3" />
											{defaultFormatDate(new Date(retro.createdAt))}
										</div>
										<div className="flex items-center gap-1">
											<Users className="w-3 h-3" />
											{m.teams_recent_retros_participants({
												count: retro.participantCount,
											})}
										</div>
										<div className="flex items-center gap-1">
											<MessageSquare className="w-3 h-3" />
											{m.teams_recent_retros_notes({ count: retro.notesCount })}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<NoItems
					title={m.teams_recent_retros_empty_title()}
					description={
						canCreateRetro
							? m.teams_recent_retros_empty_description_admin()
							: m.teams_recent_retros_empty_description_member()
					}
					className="py-12"
				>
					{canCreateRetro && (
						<Button
							onClick={() => setIsCreateModalOpen(true)}
							className="gap-2"
						>
							<Plus className="w-4 h-4" />
							{m.teams_create_first_retro()}
						</Button>
					)}
				</NoItems>
			)}

			{/* Create Retro Modal */}
			<CreateRetroModal
				open={isCreateModalOpen}
				onOpenChange={setIsCreateModalOpen}
				teamId={teamId}
			/>
		</div>
	);
}
