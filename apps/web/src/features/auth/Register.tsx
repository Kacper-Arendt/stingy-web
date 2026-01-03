import Card from "@repo/ui/card";
import { useToastManager } from "@repo/ui/toast";
import { useNavigate } from "@tanstack/react-router";
import { useTransition } from "react";
import AppLink from "@/components/ui/AppLink";
import { useT } from "@/locales/useT";
import { register } from "./api/register.api";
import RouteWrapper from "./components/RouteWrapper";
import SignForm from "./components/SignForm";
import type { UserSignData } from "./schemas/user.schema";
import type { RegisterUserPayload } from "./types/register";

const Register = () => {
	const navigate = useNavigate();
	const { t } = useT();
	const [isPending, startTransition] = useTransition();
	const toastManager = useToastManager();

	const onSubmit = async (data: UserSignData) =>
		startTransition(async () => {
			const payload: RegisterUserPayload = {
				email: data.email,
				password: data.password,
			};

			const res = await register(payload);

			if (res.ok) {
				toastManager.add({
					title: t("register_success"),
					type: "success",
				});
				return navigate({ to: "/auth" });
			}

			if (!res.ok) {
				const responseData = await res.json();
				if (
					responseData?.message === `Username '${data.email}' is already taken.`
				)
					toastManager.add({
						title: t("register_error_email_taken"),
						type: "error",
					});
				else
					toastManager.add({
						title: t("register_error_general"),
						type: "error",
					});
			}
		});

	return (
		<RouteWrapper>
			<Card>
				<Card.Header>
					<Card.Title>{t("register_title")}</Card.Title>
				</Card.Header>

				<Card.Content>
					<SignForm
						onSubmit={onSubmit}
						isPending={isPending}
						submitButtonText={t("register_button")}
					/>
				</Card.Content>

				<Card.Footer>
					<AppLink to="/auth">
						{t("register_already_account")} {t("register_sign_in")}
					</AppLink>
				</Card.Footer>
			</Card>
		</RouteWrapper>
	);
};

export default Register;
