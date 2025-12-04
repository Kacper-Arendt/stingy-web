import { FormItem } from "@/components/ui/FormItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import * as m from "@/paraglide/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CogIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateTeam } from "../../api/teams.api";
import { useTeam } from "../../hooks/useTeam";
import type { UpdateTeamData } from "../../types/team";

const editTeamSchema = z.object({
	name: z.string().min(2).max(100),
	description: z.string().max(500),
});

type EditTeamFormData = z.infer<typeof editTeamSchema>;

interface BasicInformationSectionProps {
	id: string;
}

export function BasicInformationSection({ id }: BasicInformationSectionProps) {
	const { data: team } = useTeam(id);

	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty },
		reset,
	} = useForm<EditTeamFormData>({
		resolver: zodResolver(editTeamSchema),
		defaultValues: {
			name: team?.name,
			description: team?.description,
		},
	});

	const updateTeamMutation = useMutation({
		mutationFn: (data: UpdateTeamData) => updateTeam(id, data),
		onSuccess: (updatedTeam) => {
			queryClient.setQueryData(teamKeys.detail(id), updatedTeam);
			queryClient.invalidateQueries({
				queryKey: teamKeys.lists(),
			});
			toast.success("Team updated successfully");
			reset();
		},
		onError: () => {
			toast.error(m.team_failed_to_update());
		},
	});

	if (!team) {
		return (
			<div className="flex items-center justify-center p-8">
				<div>{m.loading()}</div>
			</div>
		);
	}

	const handleFormSubmit = async (data: EditTeamFormData) => {
		try {
			await updateTeamMutation.mutateAsync(data);
		} catch (error) {
			toast.error(m.team_failed_to_update());
		}
	};

	const isFormLoading = isSubmitting || updateTeamMutation.isPending;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center space-x-2">
					<CogIcon className="w-5 h-5" />
					<span>{m.teams_basic_information()}</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
					<FormItem
						id="team-name"
						label={{ text: m.teams_team_name(), required: true }}
						errors={errors.name?.message ? [errors.name.message] : null}
					>
						<Input id="team-name" {...register("name")} />
					</FormItem>

					<FormItem
						id="team-description"
						label={{
							text: m.teams_team_description(),
							required: false,
						}}
						errors={
							errors.description?.message ? [errors.description.message] : null
						}
					>
						<Textarea
							id="team-description"
							{...register("description")}
							size="lg"
						/>
					</FormItem>

					{isDirty && (
						<Button type="submit" disabled={isFormLoading} className="w-full">
							{isFormLoading ? m.saving() : m.save()}
						</Button>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
