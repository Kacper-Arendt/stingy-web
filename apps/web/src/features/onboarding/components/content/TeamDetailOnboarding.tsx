import { m } from "@/paraglide/messages";
import type { OnboardingSection } from "../OnboardingModal";

export const getTeamDetailOnboardingSections = (): OnboardingSection[] => [
	{
		title: m.onboarding_team_detail_section_overview_title(),
		content: (
			<div className="space-y-2">
				<p>{m.onboarding_team_detail_section_overview_content()}</p>
			</div>
		),
	},
	{
		title: m.onboarding_team_detail_section_features_title(),
		content: (
			<div className="space-y-2">
				<ul className="list-disc list-inside space-y-1 ml-2">
					<li>{m.onboarding_team_detail_section_features_item_1()}</li>
					<li>{m.onboarding_team_detail_section_features_item_2()}</li>
					<li>{m.onboarding_team_detail_section_features_item_3()}</li>
					<li>{m.onboarding_team_detail_section_features_item_4()}</li>
					<li>{m.onboarding_team_detail_section_features_item_5()}</li>
				</ul>
			</div>
		),
	},
	{
		title: m.onboarding_team_detail_section_roles_title(),
		content: (
			<div className="space-y-2">
				<p>{m.onboarding_team_detail_section_roles_content()}</p>
				<ul className="list-disc list-inside space-y-1 ml-2">
					<li>
						<strong>{m.onboarding_team_detail_section_roles_admin()}</strong>{" "}
						{m.onboarding_team_detail_section_roles_admin_desc()}
					</li>
					<li>
						<strong>{m.onboarding_team_detail_section_roles_member()}</strong>{" "}
						{m.onboarding_team_detail_section_roles_member_desc()}
					</li>
				</ul>
			</div>
		),
	},
];
