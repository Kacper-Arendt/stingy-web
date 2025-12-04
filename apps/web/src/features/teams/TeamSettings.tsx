import { SomethingWentWrong } from "@/components/blocks/SomethinWentWrong";
import { Skeleton } from "@/components/ui/skeleton";
import { OnboardingModal } from "@/features/onboarding/components/OnboardingModal";
import { getTeamSettingsOnboardingSections } from "@/features/onboarding/components/content/TeamSettingsOnboarding";
import { useOnboardingModal } from "@/features/onboarding/hooks/useOnboardingModal";
import { OnboardingRouteKey } from "@/features/onboarding/types/onboarding";
import * as m from "@/paraglide/messages";
import { BasicInformationSection } from "./components/settings/BasicInformationSection";
import { DangerZone } from "./components/settings/DangerZone";
import { TeamMembersSection } from "./components/settings/TeamMembersSection";
import { TeamSettingsHeader } from "./components/settings/TeamSettingsHeader";
import { TeamPermissionsProvider } from "./context/TeamPermissionsContext";
import { useTeam } from "./hooks/useTeam";
import { getTeamPermissionsWithFallback } from "./utils/teamPermissions";

interface TeamSettingsProps {
	teamId: string;
}

export function TeamSettings({ teamId }: TeamSettingsProps) {
	const { data: team, isLoading } = useTeam(teamId);
	const {
		isOpen: isOnboardingOpen,
		handleDone: handleOnboardingDone,
		handleClosed: handleOnboardingClosed,
		handleTodo: handleOnboardingTodo,
	} = useOnboardingModal(OnboardingRouteKey.TEAM_SETTINGS);

	if (isLoading) return <Skeleton className="h-[125px] w-full rounded-xl" />;

	if (!team) return <SomethingWentWrong description={m.teams_not_found()} />;

	const permissions = getTeamPermissionsWithFallback(
		team.permissions,
		team.userRole,
	);

	return (
		<TeamPermissionsProvider permissions={permissions}>
			<div className="max-w-7xl mx-auto p-6">
				{/* Header */}
				<TeamSettingsHeader team={team} />

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-1">
						<BasicInformationSection id={team.id} />
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						<TeamMembersSection teamId={team.id} />
						<DangerZone teamId={team.id} userRole={team.userRole} />
					</div>
				</div>
			</div>

			<OnboardingModal
				open={isOnboardingOpen}
				onDone={handleOnboardingDone}
				onClosed={handleOnboardingClosed}
				onTodo={handleOnboardingTodo}
				title={m.onboarding_team_settings_title()}
				sections={getTeamSettingsOnboardingSections()}
			/>
		</TeamPermissionsProvider>
	);
}
