import * as m from "@/paraglide/messages";
import { z } from "zod";

export const createForgotPasswordSchema = () =>
	z.object({
		email: z
			.string()
			.min(1, m.forgot_password_validation_email_required())
			.email(m.forgot_password_validation_email_invalid()),
	});

export type ForgotPasswordFormData = z.infer<
	ReturnType<typeof createForgotPasswordSchema>
>;
