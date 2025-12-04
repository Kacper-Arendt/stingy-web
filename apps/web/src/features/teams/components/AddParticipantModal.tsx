import { FormItem } from "@/components/ui/FormItem";
import { FormStatusMessage } from "@/components/ui/FormStatusMessage";
import { FormSheet } from "@/components/ui/form-sheet";
import { Input } from "@/components/ui/input";
import * as m from "@/paraglide/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddTeamParticipant } from "../hooks/useAddTeamParticipant";
import { useEmailValidation } from "../hooks/useEmailValidation";

interface AddParticipantModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	teamId: string;
}

export function AddParticipantModal({
	open,
	onOpenChange,
	teamId,
}: AddParticipantModalProps) {
	const [submitError, setSubmitError] = useState<string | null>(null);
	const addParticipantMutation = useAddTeamParticipant(teamId);
	const emailValidator = useEmailValidation(teamId);

	// Create dynamic schema with email validation against existing participants
	const addParticipantSchema = z.object({
		email: z
			.string()
			.email(m.teams_add_participant_email_invalid())
			.refine(
				(email) => {
					if (emailValidator.isLoading) return true; // Skip validation if loading
					return !emailValidator.isEmailTaken(email);
				},
				{
					message: m.teams_add_participant_email_exists(),
				},
			),
		role: z.coerce.number().min(0).max(2),
	});

	type AddParticipantFormData = z.infer<typeof addParticipantSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		trigger,
		watch,
	} = useForm<AddParticipantFormData>({
		resolver: zodResolver(addParticipantSchema),
		defaultValues: {
			role: 2, // Default to Member
		},
	});

	const watchedEmail = watch("email");

	const onSubmit = async (data: AddParticipantFormData) => {
		try {
			setSubmitError(null);

			// Double-check email doesn't exist (in case participants were updated)
			if (emailValidator.isEmailTaken(data.email)) {
				const participant = emailValidator.getParticipantByEmail(data.email);

				if (participant?.status === "Invited") {
					setSubmitError(m.teams_add_participant_email_pending());
				} else {
					setSubmitError(m.teams_add_participant_email_member());
				}
				return;
			}

			await addParticipantMutation.mutateAsync(data);
			reset();
			onOpenChange(false);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: m.teams_add_participant_error();

			// Handle specific error cases
			if (
				errorMessage.includes("already exists") ||
				errorMessage.includes("duplicate")
			) {
				setSubmitError(m.teams_add_participant_email_exists());
			} else {
				setSubmitError(errorMessage);
			}
		}
	};

	const handleClose = () => {
		reset();
		setSubmitError(null);
		onOpenChange(false);
	};

	const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const email = e.target.value;

		// Re-validate email field when it changes
		if (email && !emailValidator.isLoading) {
			await trigger("email");
		}
	};

	// Get contextual feedback for current email
	const getEmailFeedback = () => {
		if (!watchedEmail || emailValidator.isLoading) return null;

		const participant = emailValidator.getParticipantByEmail(watchedEmail);
		if (!participant) return null;

		if (participant.status === "Invited") {
			return {
				type: "warning" as const,
				message: m.teams_add_participant_email_pending_warning(),
			};
		} else if (participant.status === "Active") {
			return {
				type: "error" as const,
				message: m.teams_add_participant_email_member_warning(),
			};
		}

		return null;
	};

	const emailFeedback = getEmailFeedback();

	return (
		<FormSheet
			open={open}
			onOpenChange={handleClose}
			title={m.teams_add_participant_title()}
			onSubmit={handleSubmit(onSubmit)}
			submitLabel={
				isSubmitting
					? m.teams_add_participant_sending()
					: m.teams_add_participant_send()
			}
			cancelLabel={m.cancel()}
			loading={isSubmitting}
		>
			{submitError && (
				<FormStatusMessage type="error">{submitError}</FormStatusMessage>
			)}

			<div className="space-y-4">
				<FormItem
					id="participant-email"
					label={{
						text: m.teams_add_participant_email_label(),
						required: true,
					}}
					errors={errors.email?.message ? [errors.email.message] : null}
				>
					<Input
						id="participant-email"
						type="email"
						placeholder={m.teams_add_participant_email_placeholder()}
						{...register("email", {
							onChange: handleEmailChange,
						})}
					/>
					{emailFeedback && (
						<div
							className={`mt-2 text-sm ${
								emailFeedback.type === "error"
									? "text-destructive"
									: "text-yellow-600 dark:text-yellow-400"
							}`}
						>
							{emailFeedback.message}
						</div>
					)}
				</FormItem>

				<FormItem
					id="participant-role"
					label={{ text: m.teams_add_participant_role_label(), required: true }}
					errors={errors.role?.message ? [errors.role.message] : null}
				>
					<select
						id="participant-role"
						className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						{...register("role")}
					>
						<option value={2}>{m.teams_role_member()}</option>
						<option value={1}>{m.teams_role_admin()}</option>
						<option value={0}>{m.teams_role_owner()}</option>
					</select>
				</FormItem>

				<div className="bg-muted/50 rounded-lg p-3">
					<p className="text-sm text-muted-foreground">
						{m.teams_add_participant_info()}
					</p>
				</div>
			</div>
		</FormSheet>
	);
}
