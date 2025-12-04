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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import * as m from "@/paraglide/messages";
import { UserMinus } from "lucide-react";
import { toast } from "sonner";
import type { TeamParticipant } from "../../api/getTeamParticipants";
import { useRemoveTeamParticipant } from "../../hooks/useRemoveTeamParticipant";
import { TeamMemberBadge } from "../shared/TeamMemberBadge";

export function Member({
	member,
	canManageMembers,
	teamId,
}: { member: TeamParticipant; canManageMembers: boolean; teamId: string }) {
	const removeParticipantMutation = useRemoveTeamParticipant(teamId);

	const handleRemoveMember = async (userId: string) => {
		try {
			await removeParticipantMutation.mutateAsync(userId);
		} catch (error) {
			toast.error(m.teams_participant_removed_error());
		}
	};

	return (
		<div className="flex items-center flex-wrap md:flex-nowrap justify-between p-3 rounded-lg border bg-card">
			<div className="flex items-center space-x-3 w-full">
				<div className="relative">
					<Avatar className="w-8 h-8">
						{member.author?.profileImageUrl && (
							<AvatarImage
								src={member.author.profileImageUrl}
								alt={member.author?.displayName}
							/>
						)}
						<AvatarFallback className="text-sm">
							{member?.author?.shortDisplayName ?? "?"}
						</AvatarFallback>
					</Avatar>
					{/* {member.status === "Active" && (
										<div
											className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"
											title="Online"
										/>
									)} */}
				</div>
				<div>
					<div className="font-medium text-sm">
						{member?.author?.displayName ?? "?"}
					</div>
					<div className="text-xs text-muted-foreground">
						{member.status === "Active"
							? m.teams_participant_status_active()
							: m.teams_participant_status_invited()}
					</div>
				</div>
			</div>
			<TeamMemberBadge role={member.role} />{" "}
			{canManageMembers && (
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className="text-destructive hover:text-destructive"
							disabled={removeParticipantMutation.isPending}
							title={m.teams_remove_participant_confirm()}
							aria-label={m.teams_remove_participant_confirm()}
						>
							<UserMinus className="w-3 h-3" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								{m.teams_remove_participant_confirm()}
							</AlertDialogTitle>
							<AlertDialogDescription>
								{/* {m.teams_remove_participant_description({
													name: member.email,
												})} */}
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>{m.cancel()}</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => handleRemoveMember(member.userId)}
								variant="destructive"
							>
								{m.teams_remove_member()}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</div>
	);
}
