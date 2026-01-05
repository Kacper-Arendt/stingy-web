import { z } from "zod";

export const CreateBudgetSchema = () =>
	z.object({
		name: z.string().min(2).max(100),
		description: z.string().max(500).optional().default(""),
		teamId: z.string().min(1),
	});

export type CreateBudgetFormData = z.infer<
	ReturnType<typeof CreateBudgetSchema>
>;
