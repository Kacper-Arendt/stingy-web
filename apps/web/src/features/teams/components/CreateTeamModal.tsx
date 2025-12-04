import { FormItem } from "@/components/ui/FormItem";
import { FormStatusMessage } from "@/components/ui/FormStatusMessage";
import { FormSheet } from "@/components/ui/form-sheet";
import { Input } from "@/components/ui/input";
import * as m from "@/paraglide/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateTeam } from "../hooks/useCreateTeam";

const createTeamSchema = z.object({
	name: z.string().min(2).max(100),
	description: z.string().max(500),
});

type CreateTeamFormData = z.infer<typeof createTeamSchema>;

interface CreateTeamModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CreateTeamModal({ open, onOpenChange }: CreateTeamModalProps) {
	const [submitError, setSubmitError] = useState<string | null>(null);
	const createTeamMutation = useCreateTeam();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<CreateTeamFormData>({
		resolver: zodResolver(createTeamSchema),
	});

	const onSubmit = async (data: CreateTeamFormData) => {
		try {
			setSubmitError(null);
			await createTeamMutation.mutateAsync(data);
			reset();
			onOpenChange(false);
		} catch (error) {
			setSubmitError(
				error instanceof Error ? error.message : m.team_failed_to_create(),
			);
		}
	};

	const handleClose = () => {
		reset();
		setSubmitError(null);
		onOpenChange(false);
	};

	return (
		<FormSheet
			open={open}
			onOpenChange={handleClose}
			title={m.teams_create_title()}
			onSubmit={handleSubmit(onSubmit)}
			submitLabel={
				isSubmitting ? m.teams_create_button_loading() : m.teams_create_button()
			}
			cancelLabel={m.teams_create_cancel()}
			loading={isSubmitting}
		>
			{submitError && (
				<FormStatusMessage type="error">{submitError}</FormStatusMessage>
			)}

			<div className="space-y-4">
				<FormItem
					id="team-name"
					label={{ text: m.teams_create_name_label(), required: true }}
					errors={errors.name?.message ? [errors.name.message] : null}
				>
					<Input id="team-name" {...register("name")} />
				</FormItem>

				<FormItem
					id="team-description"
					label={{
						text: m.teams_create_description_label(),
						required: false,
					}}
					errors={
						errors.description?.message ? [errors.description.message] : null
					}
				>
					<textarea
						id="team-description"
						className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						{...register("description")}
					/>
				</FormItem>
			</div>
		</FormSheet>
	);
}
