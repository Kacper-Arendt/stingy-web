import { m } from "@/paraglide/messages";
import type { OnboardingSection } from "../OnboardingModal";

export const getTeamSummariesOnboardingSections = (): OnboardingSection[] => [
	{
		title: m.onboarding_team_summaries_section_overview_title(),
		content: (
			<div className="space-y-2">
				<p>{m.onboarding_team_summaries_section_overview_content()}</p>
			</div>
		),
	},
	{
		title: m.onboarding_team_summaries_section_what_title(),
		content: (
			<div className="space-y-2">
				<p>{m.onboarding_team_summaries_section_what_content()}</p>
				<ul className="list-disc list-inside space-y-1 ml-2">
					<li>{m.onboarding_team_summaries_section_what_item_1()}</li>
					<li>{m.onboarding_team_summaries_section_what_item_2()}</li>
					<li>{m.onboarding_team_summaries_section_what_item_3()}</li>
					<li>{m.onboarding_team_summaries_section_what_item_4()}</li>
				</ul>
			</div>
		),
	},
	{
		title: m.onboarding_team_summaries_section_features_title(),
		content: (
			<div className="space-y-2">
				<p>{m.onboarding_team_summaries_section_features_content()}</p>
				<ul className="list-disc list-inside space-y-1 ml-2">
					<li>{m.onboarding_team_summaries_section_features_item_1()}</li>
					<li>{m.onboarding_team_summaries_section_features_item_2()}</li>
					<li>{m.onboarding_team_summaries_section_features_item_3()}</li>
				</ul>
			</div>
		),
	},
	{
		title: m.onboarding_team_summaries_section_tips_title(),
		content: (
			<div className="space-y-2">
				<ul className="list-disc list-inside space-y-1 ml-2">
					<li>{m.onboarding_team_summaries_section_tips_item_1()}</li>
					<li>{m.onboarding_team_summaries_section_tips_item_2()}</li>
					<li>{m.onboarding_team_summaries_section_tips_item_3()}</li>
				</ul>
			</div>
		),
	},
];
