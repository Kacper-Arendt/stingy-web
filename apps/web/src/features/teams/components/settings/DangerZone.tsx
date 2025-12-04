import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as m from "@/paraglide/messages";

import { Trash2 } from "lucide-react";

import { useTeamPermissions } from "../../context/TeamPermissionsContext";
import { useDeleteTeam } from "../../hooks/useDeleteTeam";
import { useLeaveTeam } from "../../hooks/useLeaveTeam";

interface DangerZoneProps {
	teamId: string;
	userRole: string;
}

export function DangerZone({ teamId, userRole }: DangerZoneProps) {
	const permissions = useTeamPermissions();
	const deleteTeamMutation = useDeleteTeam(teamId);
	const leaveTeamMutation = useLeaveTeam(teamId);

	const isOwner = userRole.toLowerCase() === "owner";
	const canDeleteTeam = permissions.canDeleteTeam;

	const handleLeaveTeam = async () => {
		await leaveTeamMutation.mutateAsync();
	};

	const handleDeleteTeam = async () => {
		await deleteTeamMutation.mutateAsync();
	};

	if (!canDeleteTeam && isOwner) {
		return null;
	}

	return (
		<Card className="border-destructive">
			<CardHeader>
				<CardTitle className="flex items-center space-x-2">
					<Trash2 className="w-5 h-5" />
					<span>{m.danger_zone()}</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{!isOwner && (
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant="outline"
								className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
								disabled={leaveTeamMutation.isPending}
								size="lg"
							>
								{m.teams_leave_team()}
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>{m.teams_leave_team()}</AlertDialogTitle>
								<AlertDialogDescription>
									{m.teams_leave_team_description()}
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>{m.cancel()}</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleLeaveTeam}
									className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
								>
									{m.teams_leave_team()}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}

				{isOwner && canDeleteTeam && (
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								variant="destructive"
								className="w-full"
								disabled={deleteTeamMutation.isPending}
							>
								{deleteTeamMutation.isPending ? m.deleting() : m.delete()} Team
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>{m.teams_delete_team()}</AlertDialogTitle>
								<AlertDialogDescription>
									{m.team_delete_description()}
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>{m.cancel()}</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleDeleteTeam}
									disabled={deleteTeamMutation.isPending}
									variant="destructive"
								>
									{deleteTeamMutation.isPending
										? m.deleting()
										: m.delete_confirm_title()}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}
			</CardContent>
		</Card>
	);
}
