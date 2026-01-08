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

export const CreateYearSchema = z.object({
	value: z.number().int(),
	budgetId: z.string().min(1),
});

export type CreateYearFormData = z.infer<typeof CreateYearSchema>;

export const UpdateYearSchema = z.object({
	value: z.number().int().optional(),
});

export type UpdateYearFormData = z.infer<typeof UpdateYearSchema>;
