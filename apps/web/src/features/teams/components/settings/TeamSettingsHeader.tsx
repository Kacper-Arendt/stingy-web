import * as m from "@/paraglide/messages";
import { getInitials } from "../../utils/teamUtils";

interface TeamSettingsHeaderProps {
	team: {
		name: string;
		description?: string;
	};
}

export function TeamSettingsHeader({ team }: TeamSettingsHeaderProps) {
	const initials = getInitials(team.name);

	return (
		<div className="flex items-center gap-4 mb-8">
			<div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center text-white font-semibold text-xl">
				{initials}
			</div>
			<div>
				<h1 className="text-2xl font-semibold text-foreground">
					{team.name} {m.teams_settings()}
				</h1>
				<p className="text-muted-foreground">
					{m.teams_settings_description()}
				</p>
			</div>
		</div>
	);
}
