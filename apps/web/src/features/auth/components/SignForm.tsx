import Button from "@repo/ui/button";
import { Form, FormItem } from "@repo/ui/form";
import Input from "@repo/ui/input";
import { useState } from "react";
import z from "zod";
import { useT } from "@/locales/useT";
import { UserSchema, type UserSignData } from "../schemas/user.schema";

const LoginForm = ({
	onSubmit,
	isPending,
	submitButtonText,
}: {
	onSubmit: (data: UserSignData) => void;
	isPending: boolean;
	submitButtonText: string;
}) => {
	const [errors, setErrors] = useState({});
	const { t } = useT();

	const submitForm = async (formValues: unknown) => {
		const result = UserSchema().safeParse(formValues);

		if (!result.success)
			return setErrors(z.flattenError(result.error).fieldErrors);

		setErrors({});
		onSubmit(result.data);
	};

	return (
		<Form errors={errors} onFormSubmit={submitForm}>
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
				{submitButtonText}
			</Button>
		</Form>
	);
};

export default LoginForm;
