import Card from "@repo/ui/card";
import { useToastManager } from "@repo/ui/toast";
import { useNavigate } from "@tanstack/react-router";
import { useTransition } from "react";
import AppLink from "@/components/ui/AppLink";
import { useT } from "@/locales/useT";
import { login } from "./api/login.api";
import RouteWrapper from "./components/RouteWrapper";
import SignForm from "./components/SignForm";
import type { UserSignData } from "./schemas/user.schema";
import type { LoginUserPayload } from "./types/login";

export const Login = () => {
	const navigate = useNavigate();
	const { t } = useT();
	const toastManager = useToastManager();
	const [isPending, startTransition] = useTransition();

	const onSubmit = async (data: UserSignData) =>
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
		<RouteWrapper>
			<Card>
				<Card.Header>
					<Card.Title>{t("login_new_title")}</Card.Title>
					<Card.Description>{t("login_new_subtitle")}</Card.Description>
				</Card.Header>

				<Card.Content>
					<SignForm
						onSubmit={onSubmit}
						isPending={isPending}
						submitButtonText={t(
							isPending ? "login_button_loading" : "login_button",
						)}
					/>
				</Card.Content>

				<Card.Footer>
					<AppLink to="/auth/register">
						{t("login_no_account")} {t("login_sign_up")}
					</AppLink>
				</Card.Footer>
			</Card>
		</RouteWrapper>
	);
};
