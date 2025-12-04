import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import * as m from "@/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { Brain, Settings, Telescope } from "lucide-react";
import { useTeamPermissions } from "../context/TeamPermissionsContext";
import type { Team } from "../types/team";
import { getInitials } from "../utils/teamUtils";
import { TeamStats } from "./TeamStats";
import { TeamIdentity } from "./shared/TeamIdentity";

interface TeamHeaderProps {
	team: Team;
}

export function TeamHeader({ team }: TeamHeaderProps) {
	const permissions = useTeamPermissions();

	return (
		<div>
			<div className="mx-auto py-8">
				{/* Team Info Section */}
				<TeamIdentity
					initials={getInitials(team.name)}
					name={team.name}
					description={team.description}
					role={team.userRole}
				/>

				{/* Quick Actions */}
				<Card className="mb-8 gradient-team-header border-0 shadow-lg">
					<CardHeader>
						<h3 className="text-lg font-semibold">Quick Actions</h3>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{permissions.canEditTeam && (
								<Button
									variant="outline"
									className="flex items-center space-x-2 h-12"
									asChild
								>
									<Link
										to="/teams/$teamId/settings"
										params={{ teamId: team.id }}
									>
										<Settings className="w-4 h-4" />
										<span>{m.teams_team_settings()}</span>
									</Link>
								</Button>
							)}

							<Button
								variant="outline"
								className="flex items-center space-x-2 h-12"
								asChild
							>
								<Link
									to="/teams/$teamId/retrospectives"
									params={{ teamId: team.id }}
								>
									<Telescope className="w-4 h-4" />
									<span>{m.teams_view_all_retros()}</span>
								</Link>
							</Button>

							<Button
								variant="outline"
								className="flex items-center space-x-2 h-12"
								asChild
							>
								<Link
									to="/teams/$teamId/summaries"
									params={{ teamId: team.id }}
								>
									<Brain className="w-4 h-4" />
									<span>{m.teams_view_all_summaries()}</span>
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Stats Preview */}
				<TeamStats teamId={team.id} />
			</div>
		</div>
	);
}
