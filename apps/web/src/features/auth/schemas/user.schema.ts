import { z } from "zod";

export const UserSchema = () =>
	z.object({
		email: z.string().min(1),
		password: z.string().min(1),
	});

export type UserSignData = z.infer<ReturnType<typeof UserSchema>>;
