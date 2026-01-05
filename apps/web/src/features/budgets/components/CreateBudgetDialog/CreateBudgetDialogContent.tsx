import ComboboxField from "@repo/ui/combobox-field";
import { Form, FormItem } from "@repo/ui/form";
import Input from "@repo/ui/input";
import { useToastManager } from "@repo/ui/toast";
import { FormFields } from "@/components/ui/formFields/FormFields";
import { FormFooter } from "@/components/ui/formFooter/FormFooter";
import { useModal } from "@/components/ui/Modal";
import { useCreateBudget } from "@/features/budgets/hooks/useCreateBudget";
import { CreateBudgetSchema } from "@/features/budgets/schemas/budget.schema";
import { useTeams } from "@/features/teams/hooks/useTeams";
import { useFormErrors } from "@/hooks/useFormErrors";
import { useT } from "@/locales/useT";

export default function CreateBudgetDialogContent() {
	const { t } = useT();
	const { close } = useModal();
	const { errors, setFormErrors, clearErrors } = useFormErrors();
	const toastManager = useToastManager();
	const { data: teams = [] } = useTeams();

	const createBudgetMutation = useCreateBudget({
		onSuccess: () => {
			toastManager.add({
				title: t("create_success"),
				type: "success",
			});
			close();
			clearErrors();
		},
		onError: () => {
			toastManager.add({
				title: t("create_error"),
				type: "error",
			});
		},
	});

	const submitForm = async (formValues: unknown) => {
		const result = CreateBudgetSchema().safeParse(formValues);

		if (!result.success) return setFormErrors(result.error);

		clearErrors();

		const data = result.data;
		await createBudgetMutation.mutateAsync({
			name: data.name,
			description: data.description || "",
			teamId: data.teamId,
		});
	};

	const handleClose = () => {
		clearErrors();
		close();
	};

	return (
		<Form errors={errors} onFormSubmit={submitForm}>
			<FormFields>
				<FormItem name="name" label={t("name")}>
					<Input
						name="name"
						required
						minLength={2}
						maxLength={100}
						autoComplete="off"
					/>
				</FormItem>

				<FormItem name="description" label={t("description")}>
					<Input name="description" maxLength={500} autoComplete="off" />
				</FormItem>

				<FormItem name="teamId" label={t("team")}>
					<ComboboxField
						name="teamId"
						items={teams.map((team) => ({ id: team.id, value: team.name }))}
						emptyText={t("no_teams_found")}
						placeholder={t("select_team_description")}
					/>
				</FormItem>

				<FormFooter
					onClose={handleClose}
					submitText={t("create_budget")}
					isPending={createBudgetMutation.isPending}
				/>
			</FormFields>
		</Form>
	);
}
