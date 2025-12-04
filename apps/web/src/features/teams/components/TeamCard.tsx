import { Badge } from "@/components/ui/badge";
import * as m from "@/paraglide/messages";
import { useDate } from "@/utils/useDate";
import { Link } from "@tanstack/react-router";
import { Calendar, FileTextIcon, UsersIcon } from "lucide-react";
import type { Team } from "../types/team";
import {
	getInitials,
	getRoleBadgeVariant,
	getRoleLabel,
} from "../utils/teamUtils";

interface TeamCardProps {
	team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
	const { defaultFormatDate } = useDate();
	const formattedDate = defaultFormatDate(new Date(team.lastRetroDate));

	return (
		<Link
			to="/teams/$teamId"
			params={{ teamId: team.id }}
			className="block group"
		>
			<div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow relative">
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
							{getInitials(team.name)}
						</div>
						<div>
							<h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
								{team.name}
							</h3>
							<Badge variant={getRoleBadgeVariant(team.userRole)}>
								{getRoleLabel(team.userRole)}
							</Badge>
						</div>
					</div>
				</div>

				<p className="text-muted-foreground text-sm mb-4 line-clamp-2">
					{team.description}
				</p>

				<div className="flex items-center justify-between text-sm text-muted-foreground">
					<div className="flex items-center gap-4">
						<span
							title={m.teams_member_count({ count: 0 })}
							className="flex items-center gap-2"
						>
							<UsersIcon className="w-4 h-4" />
							{team?.memberCount ?? 0}
						</span>
						<span
							title={m.teams_retro_count({ count: 0 })}
							aria-label={m.teams_retro_count({ count: 0 })}
							className="flex items-center gap-2"
						>
							<FileTextIcon className="w-4 h-4" /> {team?.retroCount ?? 0}
						</span>
					</div>
					{/* {team.lastRetroDate && ( */}
					<span
						title={m.teams_last_retro_date()}
						aria-label={m.teams_last_retro_date()}
						className="flex items-center gap-2"
					>
						<Calendar className="w-4 h-4" />
						{team?.lastRetroDate && formattedDate}
					</span>
				</div>
			</div>
		</Link>
	);
}
