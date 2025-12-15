import Button from "@repo/ui/button";
import Card from "@repo/ui/card";
import { useToastManager } from "@repo/ui/toast";
import { Link, useNavigate } from "@tanstack/react-router";
import { useTransition } from "react";
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

			if (res.ok) return navigate({ to: "/auth" });

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
					<Card.Title>{t("register_new_title")}</Card.Title>
					<Card.Description>{t("register_new_subtitle")}</Card.Description>
				</Card.Header>

				<Card.Content>
					<SignForm
						onSubmit={onSubmit}
						isPending={isPending}
						submitButtonText={t(
							isPending ? "register_button_loading" : "register_button",
						)}
					/>
				</Card.Content>

				<Card.Footer>
					<Button
						variant="link"
						size="small"
						render={
							<Link to="/auth">
								{t("register_already_account")} {t("register_sign_in")}
							</Link>
						}
					/>
				</Card.Footer>
			</Card>
		</RouteWrapper>
	);
};

export default Register;
