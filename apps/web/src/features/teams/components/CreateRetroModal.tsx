import { FormItem } from "@/components/ui/FormItem";
import { FormSheet } from "@/components/ui/form-sheet";
import { Input } from "@/components/ui/input";
import * as m from "@/paraglide/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateTeamRetro } from "../hooks/useCreateTeamRetro";
import { ColumnManager } from "./ColumnManager";

interface CreateRetroModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	teamId: string;
}

const columnSchema = z.object({
	title: z
		.string()
		.min(1, m.retro_column_title_required())
		.max(100, m.retro_column_title_too_long()),
	color: z
		.string()
		.regex(
			/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
			m.retro_column_color_invalid(),
		),
	order: z.number(),
});

const createRetroSchema = z.object({
	title: z
		.string()
		.min(2, m.teams_create_retro_title_required())
		.max(100, m.teams_create_retro_title_too_long()),
	columns: z.array(columnSchema).optional(),
});

type CreateRetroFormData = z.infer<typeof createRetroSchema>;

export function CreateRetroModal({
	open,
	onOpenChange,
	teamId,
}: CreateRetroModalProps) {
	const createRetroMutation = useCreateTeamRetro(teamId);
	const navigate = useNavigate();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<CreateRetroFormData>({
		resolver: zodResolver(createRetroSchema),
		defaultValues: {
			title: "",
			columns: [],
		},
	});

	const onSubmit = async (data: CreateRetroFormData) => {
		try {
			// Update order values based on array position
			const columns = data.columns?.map((col, index) => ({
				...col,
				order: index + 1,
			}));

			const submitData = {
				title: data.title,
				...(columns && columns.length > 0 && { columns }),
			};

			const result = await createRetroMutation.mutateAsync(submitData);

			reset();
			onOpenChange(false);
			// Navigate to the created retrospective
			navigate({
				to: "/teams/$teamId/retros/$retroId",
				params: { teamId, retroId: result.id },
			});
		} catch (error) {
			toast.error(m.teams_create_retro_error());
		}
	};

	const handleClose = () => {
		reset();
		onOpenChange(false);
	};

	return (
		<FormSheet
			open={open}
			onOpenChange={handleClose}
			title={m.teams_create_retro_title()}
			onSubmit={handleSubmit(onSubmit)}
			submitLabel={
				isSubmitting
					? m.teams_create_retro_creating()
					: m.teams_create_retro_create()
			}
			cancelLabel={m.cancel()}
			loading={isSubmitting}
			className="overflow-auto"
		>
			<div className="space-y-6 overflow-hidden flex flex-col">
				<FormItem
					id="retro-title"
					label={{ text: m.teams_create_retro_title_label(), required: true }}
					errors={errors.title?.message ? [errors.title.message] : null}
				>
					<Input
						id="retro-title"
						type="text"
						placeholder={m.teams_create_retro_title_placeholder()}
						{...register("title")}
					/>
				</FormItem>

				<div className="border-t pt-4 overflow-auto flex-1">
					<ColumnManager control={control} errors={errors} />
				</div>

				<div className="bg-muted/50 rounded-lg p-3">
					<p className="text-sm text-muted-foreground">
						{m.teams_create_retro_info()}
					</p>
				</div>
			</div>
		</FormSheet>
	);
}
