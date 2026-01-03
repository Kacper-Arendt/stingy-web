import { z } from "zod";

export const CreateTeamSchema = () =>
	z.object({
		name: z.string().min(2).max(100),
		description: z.string().max(500).optional().default(""),
	});

export type CreateTeamFormData = z.infer<ReturnType<typeof CreateTeamSchema>>;
