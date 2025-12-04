import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import * as m from "@/paraglide/messages";
import { useState } from "react";
import { useTeams } from "../hooks/useTeams";
import { useUserTeamInvitations } from "../hooks/useUserTeamInvitations";
import { CreateTeamModal } from "./CreateTeamModal";
import { TeamCard } from "./TeamCard";
import { TeamInvitationCard } from "./TeamInvitationCard";

export function TeamsList() {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const { data: teams, isLoading } = useTeams();
	const { data: invitations } = useUserTeamInvitations();

	return (
		<div className="space-y-6">
			{/* Search and Create Section */}
			<div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
				<Button
					onClick={() => setIsCreateModalOpen(true)}
					className="ml-auto"
					size="lg"
				>
					{m.teams_create_team()}
				</Button>
			</div>

			{/* Teams Grid */}
			{isLoading && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Skeleton className="h-45 rounded-lg w-full" />
					<Skeleton className="h-45 rounded-lg w-full" />
					<Skeleton className="h-45 rounded-lg w-full" />
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{invitations?.map((inv) => (
					<TeamInvitationCard
						key={`${inv.teamId}-${inv.email}-${inv.invitedAt}`}
						invitation={inv}
					/>
				))}

				{teams?.map((team) => (
					<TeamCard key={team.id} team={team} />
				))}
			</div>

			{/* Create Team Modal */}
			<CreateTeamModal
				open={isCreateModalOpen}
				onOpenChange={setIsCreateModalOpen}
			/>
		</div>
	);
}
