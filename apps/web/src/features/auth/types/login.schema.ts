import { z } from "zod";

export const createLoginSchema = () =>
	z.object({
		email: z.string().min(1).email(),
		password: z.string().min(1).min(6),
		rememberMe: z.boolean().optional(),
	});

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
