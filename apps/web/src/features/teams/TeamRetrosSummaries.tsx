import { SomethingWentWrong } from "@/components/blocks/SomethinWentWrong";
import { Skeleton } from "@/components/ui/skeleton";
import { OnboardingModal } from "@/features/onboarding/components/OnboardingModal";
import { getTeamSummariesOnboardingSections } from "@/features/onboarding/components/content/TeamSummariesOnboarding";
import { useOnboardingModal } from "@/features/onboarding/hooks/useOnboardingModal";
import { OnboardingRouteKey } from "@/features/onboarding/types/onboarding";
import * as m from "@/paraglide/messages";
import { RetroSummaries } from "./components/RetroSummaries";
import { TeamIdentity } from "./components/shared/TeamIdentity";
import { TeamPermissionsProvider } from "./context/TeamPermissionsContext";
import { useTeam } from "./hooks/useTeam";
import { getTeamPermissionsWithFallback } from "./utils/teamPermissions";
import { getInitials } from "./utils/teamUtils";

interface TeamRetrosSummariesProps {
	teamId: string;
}

export function TeamRetrosSummaries({ teamId }: TeamRetrosSummariesProps) {
	const { data: team, isLoading } = useTeam(teamId);
	const {
		isOpen: isOnboardingOpen,
		handleDone: handleOnboardingDone,
		handleClosed: handleOnboardingClosed,
		handleTodo: handleOnboardingTodo,
	} = useOnboardingModal(OnboardingRouteKey.TEAM_SUMMARIES);

	if (isLoading) return <Skeleton className="h-[125px] w-full rounded-xl" />;

	if (!team) return <SomethingWentWrong description={m.teams_not_found()} />;

	const permissions = getTeamPermissionsWithFallback(
		team.permissions,
		team.userRole,
	);

	return (
		<TeamPermissionsProvider permissions={permissions}>
			<div className="max-w-7xl mx-auto p-6">
				<TeamIdentity
					initials={getInitials(team.name)}
					name={team.name}
					description={team.description}
					role={team.userRole}
				/>
				<RetroSummaries />
			</div>

			<OnboardingModal
				open={isOnboardingOpen}
				onDone={handleOnboardingDone}
				onClosed={handleOnboardingClosed}
				onTodo={handleOnboardingTodo}
				title={m.onboarding_team_summaries_title()}
				sections={getTeamSummariesOnboardingSections()}
			/>
		</TeamPermissionsProvider>
	);
}
