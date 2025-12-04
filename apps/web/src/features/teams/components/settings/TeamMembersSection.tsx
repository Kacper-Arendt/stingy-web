import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import * as m from "@/paraglide/messages";
import { CheckCircle, Clock, Users } from "lucide-react";
import { useTeamPermissions } from "../../context/TeamPermissionsContext";

import { useTeamParticipants } from "../../hooks/useTeamParticipants";

import { AddTeamMember } from "./AddTeamMember";
import { Member } from "./Member";

interface TeamMembersSectionProps {
	teamId: string;
}

export function TeamMembersSection({ teamId }: TeamMembersSectionProps) {
	const permissions = useTeamPermissions();
	const { data: members = [], isLoading } = useTeamParticipants(teamId);

	const canManageMembers =
		permissions.canManageParticipants || permissions.canInviteUsers;

	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Users className="w-5 h-5" />
						<span>{m.teams_participants_title()}</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="animate-pulse space-y-3">
						{Array.from({ length: 3 }, (_, i) => (
							<div key={i} className="h-16 bg-muted rounded" />
						))}
					</div>
				</CardContent>
			</Card>
		);
	}

	const activeMembers = members.filter((p) => p.status === "Active");
	const pendingMembers = members.filter((p) => p.status === "Invited");

	const stats = {
		total: members.length,
		active: activeMembers.length,
		pending: pendingMembers.length,
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center space-x-2">
					<Users className="w-5 h-5" />
					<span>{m.teams_participants_title()}</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<AddTeamMember teamId={teamId} />

				<Separator />

				<div>
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

				{/* Members List */}
				<div className="space-y-3">
					{activeMembers?.map((member) => (
						<Member
							key={member.userId}
							member={member}
							canManageMembers={canManageMembers}
							teamId={teamId}
						/>
					))}

					<Separator />

					{pendingMembers?.map((member) => (
						<Member
							key={member.userId}
							member={member}
							canManageMembers={canManageMembers}
							teamId={teamId}
						/>
					))}
				</div>

				{members.length === 0 && (
					<div className="text-center py-8 text-muted-foreground">
						<Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
						<p className="text-sm">{m.teams_participants_empty()}</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
