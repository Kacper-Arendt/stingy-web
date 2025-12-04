import { m } from "@/paraglide/messages";
import type { OnboardingSection } from "../OnboardingModal";

export const getTeamSettingsOnboardingSections = (): OnboardingSection[] => [
	{
		title: m.onboarding_team_settings_section_overview_title(),
		content: (
			<div className="space-y-2">
				<p>{m.onboarding_team_settings_section_overview_content()}</p>
			</div>
		),
	},
	{
		title: m.onboarding_team_settings_section_basic_info_title(),
		content: (
			<div className="space-y-2">
				<p>{m.onboarding_team_settings_section_basic_info_content()}</p>
				<ul className="list-disc list-inside space-y-1 ml-2">
					<li>{m.onboarding_team_settings_section_basic_info_item_1()}</li>
					<li>{m.onboarding_team_settings_section_basic_info_item_2()}</li>
					<li>{m.onboarding_team_settings_section_basic_info_item_3()}</li>
				</ul>
			</div>
		),
	},
	{
		title: m.onboarding_team_settings_section_members_title(),
		content: (
			<div className="space-y-2">
				<p>{m.onboarding_team_settings_section_members_content()}</p>
				<ul className="list-disc list-inside space-y-1 ml-2">
					<li>{m.onboarding_team_settings_section_members_item_1()}</li>
					<li>{m.onboarding_team_settings_section_members_item_2()}</li>
					<li>{m.onboarding_team_settings_section_members_item_3()}</li>
				</ul>
			</div>
		),
	},
	{
		title: m.onboarding_team_settings_section_danger_zone_title(),
		content: (
			<div className="space-y-2">
				<p>{m.onboarding_team_settings_section_danger_zone_content()}</p>
				<ul className="list-disc list-inside space-y-1 ml-2">
					<li>{m.onboarding_team_settings_section_danger_zone_item_1()}</li>
					<li>{m.onboarding_team_settings_section_danger_zone_item_2()}</li>
				</ul>
			</div>
		),
	},
];
