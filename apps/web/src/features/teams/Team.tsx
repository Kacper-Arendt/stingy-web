import { SomethingWentWrong } from "@/components/blocks/SomethinWentWrong";
import { Skeleton } from "@/components/ui/skeleton";
import { OnboardingModal } from "@/features/onboarding/components/OnboardingModal";
import { getTeamDetailOnboardingSections } from "@/features/onboarding/components/content/TeamDetailOnboarding";
import { useOnboardingModal } from "@/features/onboarding/hooks/useOnboardingModal";
import { OnboardingRouteKey } from "@/features/onboarding/types/onboarding";
import { m } from "@/paraglide/messages";
import { RecentRetros } from "./components/RecentRetros";
import { TeamHeader } from "./components/TeamHeader";
import { TeamMembers } from "./components/TeamMembers";
import { TeamPermissionsProvider } from "./context/TeamPermissionsContext";
import { useTeam } from "./hooks/useTeam";
import { getTeamPermissionsWithFallback } from "./utils/teamPermissions";

export function Team({ teamId }: { teamId: string }) {
	const { data: team, isLoading, error } = useTeam(teamId);
	const {
		isOpen: isOnboardingOpen,
		handleDone: handleOnboardingDone,
		handleClosed: handleOnboardingClosed,
		handleTodo: handleOnboardingTodo,
	} = useOnboardingModal(OnboardingRouteKey.TEAM_DETAIL);

	if (isLoading) {
		return (
			<div className="container max-w-4xl mx-auto py-8">
				<Skeleton className="h-25 w-1/2 rounded-lg mb-4" />
				<Skeleton className="h-25 w-full rounded-lg mb-4" />
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<Skeleton className="h-25 rounded-lg" />
					<Skeleton className="h-25 rounded-lg" />
					<Skeleton className="h-25 rounded-lg" />
					<Skeleton className="h-25 rounded-lg" />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
					<Skeleton className="h-45 rounded-lg w-full" />
					<Skeleton className="h-45 rounded-lg w-full" />
				</div>
			</div>
		);
	}

	if (error || !team)
		return <SomethingWentWrong description={m.teams_not_found()} />;

	const permissions = getTeamPermissionsWithFallback(
		team.permissions,
		team.userRole,
	);
	return (
		<TeamPermissionsProvider permissions={permissions}>
			<div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
				{/* Team Header */}
				<TeamHeader team={team} />

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Recent Retrospectives */}
					<div className="lg:col-span-1">
						<RecentRetros
							teamId={teamId}
							canCreateRetro={permissions.canCreateRetro}
						/>
					</div>

					{/* Team Members */}
					<div className="lg:col-span-1">
						<TeamMembers
							teamId={teamId}
							participants={team.participants ?? []}
						/>
					</div>
				</div>
			</div>

			<OnboardingModal
				open={isOnboardingOpen}
				onDone={handleOnboardingDone}
				onClosed={handleOnboardingClosed}
				onTodo={handleOnboardingTodo}
				title={m.onboarding_team_detail_title()}
				sections={getTeamDetailOnboardingSections()}
			/>
		</TeamPermissionsProvider>
	);
}
