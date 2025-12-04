import { m } from "@/paraglide/messages";
import type { OnboardingSection } from "../OnboardingModal";

export const getRetrospectiveOnboardingSections = (): OnboardingSection[] => [
	{
		title: m.onboarding_retro_section_statuses_title(),
		content: (
			<div className="space-y-2">
				<p>{m.onboarding_retro_section_statuses_content()}</p>
				<ul className="list-disc list-inside space-y-1 ml-2">
					<li>
						<strong>{m.onboarding_retro_section_statuses_planned()}</strong>{" "}
						{m.onboarding_retro_section_statuses_planned_desc()}
					</li>
					<li>
						<strong>{m.onboarding_retro_section_statuses_inprogress()}</strong>{" "}
						{m.onboarding_retro_section_statuses_inprogress_desc()}
					</li>
					<li>
						<strong>{m.onboarding_retro_section_statuses_revealed()}</strong>{" "}
						{m.onboarding_retro_section_statuses_revealed_desc()}
					</li>
					<li>
						<strong>{m.onboarding_retro_section_statuses_finished()}</strong>{" "}
						{m.onboarding_retro_section_statuses_finished_desc()}
					</li>
				</ul>
			</div>
		),
	},
	{
		title: m.onboarding_retro_section_notes_title(),
		content: (
			<div className="space-y-2">
				<p>{m.onboarding_retro_section_notes_content()}</p>
				<ul className="list-disc list-inside space-y-1 ml-2">
					<li>{m.onboarding_retro_section_notes_item_1()}</li>
					<li>{m.onboarding_retro_section_notes_item_2()}</li>
					<li>{m.onboarding_retro_section_notes_item_3()}</li>
				</ul>
			</div>
		),
	},
	{
		title: m.onboarding_retro_section_features_title(),
		content: (
			<div className="space-y-2">
				<ul className="list-disc list-inside space-y-1 ml-2">
					<li>
						<strong>{m.onboarding_retro_section_features_slideshow()}</strong>{" "}
						{m.onboarding_retro_section_features_slideshow_desc()}
					</li>
					<li>
						<strong>{m.onboarding_retro_section_features_summary()}</strong>{" "}
						{m.onboarding_retro_section_features_summary_desc()}
					</li>
				</ul>
			</div>
		),
	},
	{
		title: m.onboarding_retro_section_permissions_title(),
		content: (
			<div className="space-y-2">
				<p>{m.onboarding_retro_section_permissions_content()}</p>
			</div>
		),
	},
];
