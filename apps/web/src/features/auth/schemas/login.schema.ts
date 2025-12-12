import { z } from "zod";

export const createLoginSchema = () =>
	z.object({
		email: z.string().min(1),
		password: z.string().min(1).min(6),
	});

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
