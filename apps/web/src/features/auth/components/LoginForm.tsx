import Button from "@repo/ui/button";
import { Form, FormItem } from "@repo/ui/form";
import Input from "@repo/ui/input";
import { useState } from "react";
import z from "zod";
import { useT } from "@/locales/useT";
import { createLoginSchema, type LoginFormData } from "../schemas/login.schema";

const LoginForm = ({
	onSubmit,
	isPending,
}: {
	onSubmit: (data: LoginFormData) => void;
	isPending: boolean;
}) => {
	const [errors, setErrors] = useState({});
	const { t } = useT();

	const submitForm = async (formValues: unknown) => {
		const result = createLoginSchema().safeParse(formValues);

		if (!result.success)
			return {
				errors: z.flattenError(result.error).fieldErrors,
			};

		return {
			errors: {},
			data: result.data,
			success: true,
		};
	};

	return (
		<Form
			errors={errors}
			onFormSubmit={async (formValues) => {
				const response = await submitForm(formValues);
				setErrors(response.errors);
				if (response.success) onSubmit(response.data);
			}}
		>
			<FormItem name="email" label={t("login_email_label")}>
				<Input
					name="email"
					placeholder={t("login_email_placeholder")}
					type="email"
					required
					autoComplete="email"
				/>
			</FormItem>

			<FormItem name="password" label={t("login_password_label")}>
				<Input
					name="password"
					placeholder={t("login_password_placeholder")}
					type="password"
					required
					autoComplete="current-password"
				/>
			</FormItem>
			<Button type="submit" variant="primary" disabled={isPending}>
				{isPending ? t("login_button_loading") : t("login_title")}
			</Button>
		</Form>
	);
};

export default LoginForm;
