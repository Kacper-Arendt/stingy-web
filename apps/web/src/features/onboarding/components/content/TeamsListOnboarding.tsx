import { m } from "@/paraglide/messages";
import type { OnboardingSection } from "../OnboardingModal";

export const getTeamsListOnboardingSections = (): OnboardingSection[] => [
	{
		title: m.onboarding_teams_list_section_what_title(),
		content: (
			<div className="space-y-2">
				<p>{m.onboarding_teams_list_section_what_content_1()}</p>
				<ul className="list-disc list-inside space-y-1 ml-2">
					<li>{m.onboarding_teams_list_section_what_item_1()}</li>
					<li>{m.onboarding_teams_list_section_what_item_2()}</li>
				</ul>
			</div>
		),
	},
	{
		title: m.onboarding_teams_list_section_header_title(),
		content: (
			<div className="space-y-2">
				<p>{m.onboarding_teams_list_section_header_content()}</p>
				<ul className="list-disc list-inside space-y-1 ml-2">
					<li>{m.onboarding_teams_list_section_header_item_1()}</li>
					<li>{m.onboarding_teams_list_section_header_item_2()}</li>
				</ul>
			</div>
		),
	},
	{
		title: m.onboarding_teams_list_section_tips_title(),
		content: (
			<div className="space-y-2">
				<ul className="list-disc list-inside space-y-1 ml-2">
					<li>{m.onboarding_teams_list_section_tips_item_1()}</li>
					<li>{m.onboarding_teams_list_section_tips_item_2()}</li>
				</ul>
			</div>
		),
	},
];
