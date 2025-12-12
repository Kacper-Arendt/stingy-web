import { useToastManager } from "@repo/ui/toast";
import { Link, useNavigate } from "@tanstack/react-router";
import { useTransition } from "react";
import { useT } from "@/locales/useT";
import { login } from "./api/login.api";
import LoginForm from "./components/LoginForm";
import styles from "./Login.module.css";
import type { LoginFormData } from "./schemas/login.schema";
import type { LoginUserPayload } from "./types/login";

export const Login = () => {
	const navigate = useNavigate();
	const { t } = useT();
	const toastManager = useToastManager();
	const [isPending, startTransition] = useTransition();

	const onSubmit = async (data: LoginFormData) =>
		startTransition(async () => {
			const payload: LoginUserPayload = {
				email: data.email,
				password: data.password,
			};

			const res = await login(payload);
			if (!res.ok)
				toastManager.add({
					title: t("login_error_invalid_credentials"),
					type: "error",
				});
			else navigate({ to: "/" });
		});

	return (
		<div className={styles.Container}>
			<div className={styles.Header}>
				<h2 className={styles.Title}>{t("login_new_title")}</h2>
				<p className={styles.Subtitle}>{t("login_new_subtitle")}</p>
			</div>

			<LoginForm onSubmit={onSubmit} isPending={isPending} />

			<div className={styles.Footer}>
				<p className={styles.FooterText}>
					{t("login_no_account")}{" "}
					<Link to="/auth/register" className={styles.Link}>
						{t("login_sign_up")}
					</Link>
				</p>
			</div>
		</div>
	);
};
