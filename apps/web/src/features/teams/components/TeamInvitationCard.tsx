import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import * as m from "@/paraglide/messages";
import { useDate } from "@/utils/useDate";
import { Calendar, Mail } from "lucide-react";
import { toast } from "sonner";
import { useUserTeamInvitations } from "../hooks/useUserTeamInvitations";
import type { TeamUserInvitation } from "../types/invitations";
import {
	getInitials,
	getRoleBadgeVariant,
	getRoleLabel,
} from "../utils/teamUtils";

interface TeamInvitationCardProps {
	invitation: TeamUserInvitation;
}

export function TeamInvitationCard({ invitation }: TeamInvitationCardProps) {
	const { defaultFormatDate } = useDate();
	const { acceptInvitation, isAccepting, denyInvitation, isDenying } =
		useUserTeamInvitations();

	const handleAccept = async () => {
		try {
			await acceptInvitation(invitation.teamId);
			toast.success(m.invitation_card_join());
		} catch (error) {
			toast.error(m.invitation_accept_error());
		}
	};

	const handleDecline = async () => {
		try {
			await denyInvitation(invitation.teamId);
			toast.success(m.invitation_card_decline());
		} catch (error) {
			toast.error(m.invitation_deny_error());
		}
	};

	return (
		<Card className="hover:shadow-md transition-shadow border-primary/50">
			<CardHeader className="mb-0">
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white font-semibold text-lg">
						{getInitials(invitation.teamName)}
					</div>
					<div>
						<CardTitle className="text-lg">{invitation.teamName}</CardTitle>
						<Badge variant={getRoleBadgeVariant(invitation.role)}>
							{getRoleLabel(invitation.role)}
						</Badge>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="text-sm text-muted-foreground flex items-center gap-3 flex-wrap">
					<span className="flex items-center gap-2">
						<Mail className="w-4 h-4" /> {invitation.email}
					</span>
					<span className="flex items-center gap-2">
						<Calendar className="w-4 h-4" />
						{defaultFormatDate(new Date(invitation.invitedAt))}
					</span>
				</div>
			</CardContent>
			<CardFooter className="justify-end gap-2">
				<Button
					variant="destructive"
					onClick={handleDecline}
					disabled={isDenying}
				>
					{m.invitation_card_decline()}
				</Button>
				<Button
					className="flex-1"
					onClick={handleAccept}
					disabled={isAccepting}
				>
					{m.join()}
				</Button>
			</CardFooter>
		</Card>
	);
}
