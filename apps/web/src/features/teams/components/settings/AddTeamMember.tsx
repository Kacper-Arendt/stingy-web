import { FormItem } from "@/components/ui/FormItem";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import * as m from "@/paraglide/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useTeamPermissions } from "../../context/TeamPermissionsContext";
import { useAddTeamParticipant } from "../../hooks/useAddTeamParticipant";
import { useEmailValidation } from "../../hooks/useEmailValidation";

const addMemberSchema = z.object({
	email: z
		.string()
		.email(m.teams_add_participant_email_invalid())
		.min(2, m.teams_add_participant_email_invalid()),
	role: z.string().min(1, "Role is required"),
});

type AddMemberFormData = z.infer<typeof addMemberSchema>;

interface AddTeamMemberProps {
	teamId: string;
}

export function AddTeamMember({ teamId }: AddTeamMemberProps) {
	const permissions = useTeamPermissions();
	const addParticipantMutation = useAddTeamParticipant(teamId);
	const emailValidator = useEmailValidation(teamId);

	const canManageMembers =
		permissions.canManageParticipants || permissions.canInviteUsers;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setValue,
		watch,
	} = useForm<AddMemberFormData>({
		resolver: zodResolver(addMemberSchema),
		defaultValues: {
			email: "",
			role: "2", // Default to member
		},
	});

	const onSubmit = async (data: AddMemberFormData) => {
		try {
			if (emailValidator.isEmailTaken(data.email)) {
				const participant = emailValidator.getParticipantByEmail(data.email);
				if (participant?.status === "Invited")
					toast.error(m.teams_add_participant_email_pending());
				else toast.error(m.teams_add_participant_email_member());

				return;
			}

			await addParticipantMutation.mutateAsync({
				email: data.email.trim(),
				role: parseInt(data.role, 10),
			});

			reset();
			toast.success(m.teams_invitation_sent_success());
		} catch (error) {
			toast.error(m.teams_add_participant_error());
		}
	};

	if (!canManageMembers) {
		return null;
	}

	return (
		<div className="space-y-3 p-4 border rounded-lg bg-muted/50">
			<Label className="text-base font-medium">
				{m.teams_add_participant()}
			</Label>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="flex flex-col md:flex-row gap-4">
					<FormItem
						className="flex-1"
						id="member-email"
						label={{
							text: m.teams_add_participant_email_label(),
							required: true,
						}}
						errors={errors.email?.message ? [errors.email.message] : null}
					>
						<Input
							id="member-email"
							type="email"
							placeholder={m.teams_add_participant_email_placeholder()}
							{...register("email")}
						/>
					</FormItem>

					<FormItem
						id="member-role"
						label={{
							text: m.teams_add_participant_role_label(),
							required: true,
						}}
						errors={errors.role?.message ? [errors.role.message] : null}
					>
						<Select
							value={watch("role")}
							onValueChange={(value) => setValue("role", value)}
						>
							<SelectTrigger className="w-full md:w-auto">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="2">{m.teams_role_member()}</SelectItem>
								<SelectItem value="1">{m.teams_role_admin()}</SelectItem>
								<SelectItem value="0">{m.teams_role_owner()}</SelectItem>
							</SelectContent>
						</Select>
					</FormItem>
				</div>

				<div className="bg-muted/50 rounded-lg p-3">
					<p className="text-sm text-muted-foreground">
						{m.teams_add_participant_info()}
					</p>
				</div>

				<Button
					type="submit"
					disabled={isSubmitting || addParticipantMutation.isPending}
					size="lg"
					className="w-full"
				>
					<Mail className="w-3 h-3 mr-2" />
					{isSubmitting || addParticipantMutation.isPending
						? m.teams_add_participant_sending()
						: m.teams_add_participant_send()}
				</Button>
			</form>
		</div>
	);
}
