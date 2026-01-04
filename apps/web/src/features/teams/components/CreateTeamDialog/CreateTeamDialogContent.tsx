import { Form, FormItem } from "@repo/ui/form";
import Input from "@repo/ui/input";
import { useToastManager } from "@repo/ui/toast";
import { FormFields } from "@/components/ui/formFields/FormFields";
import { FormFooter } from "@/components/ui/formFooter/FormFooter";
import { useModal } from "@/components/ui/Modal";
import { useFormErrors } from "@/hooks/useFormErrors";
import { useT } from "@/locales/useT";
import { useCreateTeam } from "../../hooks/useCreateTeam";
import { CreateTeamSchema } from "../../schemas/team.schema";

export default function CreateTeamDialogContent() {
	const { t } = useT();
	const { close } = useModal();
	const { errors, setFormErrors, clearErrors } = useFormErrors();
	const toastManager = useToastManager();

	const createTeamMutation = useCreateTeam({
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
		const result = CreateTeamSchema().safeParse(formValues);

		if (!result.success) return setFormErrors(result.error);

		clearErrors();

		const data = result.data;
		await createTeamMutation.mutateAsync({
			name: data.name,
			description: data.description || "",
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
						autoFocus
					/>
				</FormItem>

				<FormItem name="description" label={t("description")}>
					<Input name="description" maxLength={500} autoComplete="off" />
				</FormItem>

				<FormFooter
					onClose={handleClose}
					submitText={t("teams_create_team")}
					isPending={createTeamMutation.isPending}
				/>
			</FormFields>
		</Form>
	);
}
