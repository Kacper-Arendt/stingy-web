import Button from "@repo/ui/button";
import Dialog from "@repo/ui/dialog";
import { Form, FormItem } from "@repo/ui/form";
import Input from "@repo/ui/input";
import Textarea from "@repo/ui/textarea";
import { useToastManager } from "@repo/ui/toast";
import { useState } from "react";
import z from "zod";
import { useT } from "@/locales/useT";
import { useCreateTeam } from "../hooks/useCreateTeam";
import { CreateTeamSchema } from "../schemas/team.schema";
import styles from "./CreateTeamDialog.module.css";

export function CreateTeamDialog() {
	const { t } = useT();
	const [errors, setErrors] = useState<Record<string, string[]>>({});
	const toastManager = useToastManager();
	const [open, setOpen] = useState(false);

	const createTeamMutation = useCreateTeam({
		onSuccess: () => {
			toastManager.add({
				title: t("create_success"),
				type: "success",
			});
			setOpen(false);
			setErrors({});
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

		if (!result.success)
			return setErrors(z.flattenError(result.error).fieldErrors);

		setErrors({});

		const data = result.data;
		await createTeamMutation.mutateAsync({
			name: data.name,
			description: data.description || "",
		});
	};

	const handleClose = () => {
		setErrors({});
		setOpen(false);
	};

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger>
				<Button>{t("teams_create_team")}</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Backdrop />
				<Dialog.Popup>
					<Dialog.Close />
					<Dialog.Title>{t("teams_create_team")}</Dialog.Title>

					<Form errors={errors} onFormSubmit={submitForm}>
						<div className={styles.FormFields}>
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
								<Textarea name="description" maxLength={500} />
							</FormItem>

							<div className={styles.ButtonGroup}>
								<Button
									type="button"
									variant="outline"
									onClick={handleClose}
									disabled={createTeamMutation.isPending}
								>
									{t("close")}
								</Button>
								<Button
									type="submit"
									variant="primary"
									disabled={createTeamMutation.isPending}
								>
									{t("teams_create_team")}
								</Button>
							</div>
						</div>
					</Form>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
