import { AuthorAvatar } from "@/components/ui/AuthorAvatar";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import * as m from "@/paraglide/messages";
import { CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import type { TeamMember } from "../types/team";
import { getRoleBadgeVariant, getRoleLabel } from "../utils/teamUtils";
import { AddParticipantModal } from "./AddParticipantModal";

interface TeamMembersProps {
	teamId: string;
	participants: TeamMember[];
}

export function TeamMembers({ teamId, participants }: TeamMembersProps) {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	// Get status icon and color for participant status
	const getStatusDisplay = (status: string) => {
		switch (status) {
			case "Active":
				return {
					variant: "default" as const,
					text: m.teams_participant_status_active(),
					className: "text-green-600",
				};
			case "Invited":
				return {
					variant: "secondary" as const,
					text: m.teams_participant_status_invited(),
					className: "text-yellow-600",
				};
			default:
				return {
					variant: "outline" as const,
					text: status,
					className: "text-muted-foreground",
				};
		}
	};

	const sortedMembers = participants.sort((a) =>
		a.status === "Invited" ? 1 : -1,
	);

	const stats = {
		total: participants.length,
		active: participants.filter((p) => p.status === "Active").length,
		pending: participants.filter((p) => p.status === "Invited").length,
	};

	return (
		<div className="bg-card border rounded-lg p-6">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<div>
					<h3 className="text-lg font-semibold">
						{m.teams_participants_title()}
					</h3>
					<div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
						<span>{m.teams_participants_count({ count: stats.total })}</span>
						{stats.pending > 0 && (
							<span className="flex items-center gap-1">
								<Clock className="w-3 h-3" />
								{stats.pending} pending
							</span>
						)}
						<span className="flex items-center gap-1">
							<CheckCircle className="w-3 h-3" />
							{stats.active} active
						</span>
					</div>
				</div>
			</div>

			{/* Participants Table */}
			{participants.length > 0 ? (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>{m.teams_participants_email()}</TableHead>
							<TableHead>{m.teams_participants_role()}</TableHead>
							<TableHead>{m.teams_participants_status()}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedMembers.map((participant) => {
							const statusDisplay = getStatusDisplay(participant.status);

							return (
								<TableRow key={participant.userId}>
									<TableCell className="font-medium">
										<div className="flex items-center gap-2">
											{participant.author && (
												<AuthorAvatar author={participant.author} size="sm" />
											)}
											<div>
												<div className="font-medium">
													{participant.author?.displayName || participant.email}
												</div>
												{participant.author && (
													<div className="text-xs text-muted-foreground">
														{participant.email}
													</div>
												)}
											</div>
										</div>
									</TableCell>
									<TableCell>
										<Badge variant={getRoleBadgeVariant(participant.role)}>
											{getRoleLabel(participant.role)}
										</Badge>
									</TableCell>
									<TableCell>
										<Badge variant={statusDisplay.variant} className="gap-1">
											{statusDisplay.text}
										</Badge>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			) : (
				<div className="text-center py-8 text-muted-foreground">
					<div className="text-4xl mb-2">👥</div>
					<p className="text-sm">{m.teams_participants_empty()}</p>
				</div>
			)}

			{/* Add Participant Modal */}
			<AddParticipantModal
				open={isAddModalOpen}
				onOpenChange={setIsAddModalOpen}
				teamId={teamId}
			/>
		</div>
	);
}
