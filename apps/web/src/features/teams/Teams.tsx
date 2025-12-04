import { OnboardingModal } from "@/features/onboarding/components/OnboardingModal";
import { getTeamsListOnboardingSections } from "@/features/onboarding/components/content/TeamsListOnboarding";
import { useOnboardingModal } from "@/features/onboarding/hooks/useOnboardingModal";
import { OnboardingRouteKey } from "@/features/onboarding/types/onboarding";
import * as m from "@/paraglide/messages";
import { TeamsList } from "./components/TeamsList";

export function Teams() {
	const { isOpen, handleDone, handleClosed, handleTodo } = useOnboardingModal(
		OnboardingRouteKey.TEAMS_LIST,
	);

	return (
		<>
			<div className="container mx-auto py-8 px-4">
				<div className="mb-8 text-center">
					<h1 className="text-3xl font-bold tracking-tight">
						{m.teams_your_teams()}
					</h1>
					<p className="text-muted-foreground mt-2">{m.teams_manage_teams()}</p>
				</div>

				<TeamsList />
			</div>

			<OnboardingModal
				open={isOpen}
				onDone={handleDone}
				onClosed={handleClosed}
				onTodo={handleTodo}
				title={m.onboarding_teams_list_title()}
				sections={getTeamsListOnboardingSections()}
			/>
		</>
	);
}
