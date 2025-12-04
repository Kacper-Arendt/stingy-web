import { FormItem } from "@/components/ui/FormItem";
import { FormStatusMessage } from "@/components/ui/FormStatusMessage";
import { Button } from "@/components/ui/button";
import { FormSheet } from "@/components/ui/form-sheet";
import { Input } from "@/components/ui/input";
import * as m from "@/paraglide/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTeamPermissions } from "../context/TeamPermissionsContext";
import { useDeleteTeam } from "../hooks/useDeleteTeam";
import { useUpdateTeam } from "../hooks/useUpdateTeam";
import type { Team } from "../types/team";

const editTeamSchema = z.object({
	name: z.string().min(2).max(100),
	description: z.string().max(500),
});

type EditTeamFormData = z.infer<typeof editTeamSchema>;

interface EditTeamFormProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	team: Team;
}

export function EditTeamForm({ open, onOpenChange, team }: EditTeamFormProps) {
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const updateTeamMutation = useUpdateTeam(team.id);
	const deleteTeamMutation = useDeleteTeam(team.id);
	const permissions = useTeamPermissions();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<EditTeamFormData>({
		resolver: zodResolver(editTeamSchema),
		defaultValues: {
			name: team.name,
			description: team.description,
		},
	});

	const onSubmit = async (data: EditTeamFormData) => {
		try {
			setSubmitError(null);
			await updateTeamMutation.mutateAsync(data);
			onOpenChange(false);
		} catch (error) {
			setSubmitError(
				error instanceof Error ? error.message : m.team_failed_to_update(),
			);
		}
	};

	const handleDelete = async () => {
		try {
			setSubmitError(null);
			await deleteTeamMutation.mutateAsync();
		} catch (error) {
			setSubmitError(
				error instanceof Error ? error.message : m.team_failed_to_update(),
			);
		}
	};

	const handleClose = () => {
		reset({
			name: team.name,
			description: team.description,
		});
		setSubmitError(null);
		setShowDeleteConfirm(false);
		onOpenChange(false);
	};

	const isLoading = isSubmitting || deleteTeamMutation.isPending;

	return (
		<FormSheet
			open={open}
			onOpenChange={handleClose}
			title={m.teams_team_settings()}
			onSubmit={handleSubmit(onSubmit)}
			submitLabel={isSubmitting ? m.saving() : m.save()}
			cancelLabel={m.cancel()}
			loading={isLoading}
			footer={
				permissions.canDeleteTeam && (
					<div className="w-full pt-6 mt-6 border-t border-destructive/20">
						<div className="space-y-3">
							<div>
								<h4 className="text-sm font-medium text-destructive">
									{m.danger_zone()}
								</h4>
								<p className="text-xs text-muted-foreground">
									{m.team_delete_description()}
								</p>
							</div>

							{!showDeleteConfirm ? (
								<Button
									type="button"
									variant="destructive"
									size="sm"
									onClick={() => setShowDeleteConfirm(true)}
									disabled={isLoading}
									className="w-full"
								>
									{deleteTeamMutation.isPending ? m.deleting() : m.delete()}
								</Button>
							) : (
								<div className="space-y-2">
									<p className="text-xs font-medium text-destructive">
										{m.are_you_sure()}
									</p>
									<div className="flex gap-2">
										<Button
											type="button"
											variant="destructive"
											size="sm"
											onClick={handleDelete}
											disabled={isLoading}
											className="flex-1"
										>
											{deleteTeamMutation.isPending
												? m.deleting()
												: m.delete_confirm_title()}
										</Button>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => setShowDeleteConfirm(false)}
											disabled={isLoading}
											className="flex-1"
										>
											{m.cancel()}
										</Button>
									</div>
								</div>
							)}
						</div>
					</div>
				)
			}
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
