import { FormItem } from "@/components/ui/FormItem";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as m from "@/paraglide/messages";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { type Control, Controller, useFieldArray } from "react-hook-form";

export interface ColumnFormData {
	title: string;
	color: string;
	order: number;
}

interface ColumnManagerProps {
	control: Control<any>;
	errors?: any;
}

const DEFAULT_COLUMNS: ColumnFormData[] = [
	{ title: "Went well", color: "#4E876F", order: 1 },
	{ title: "Went wrong", color: "#8A3422", order: 2 },
	{ title: "Action items", color: "#4A466D", order: 3 },
];

export function ColumnManager({ control, errors }: ColumnManagerProps) {
	const { fields, append, remove, move } = useFieldArray({
		control,
		name: "columns",
	});

	const addColumn = () => {
		const nextOrder = fields.length + 1;
		append({
			title: "",
			color: "#3b82f6",
			order: nextOrder,
		});
	};

	const moveUp = (index: number) => {
		if (index > 0) {
			move(index, index - 1);
		}
	};

	const moveDown = (index: number) => {
		if (index < fields.length - 1) {
			move(index, index + 1);
		}
	};

	const loadDefaults = () => {
		// Clear existing and load defaults
		while (fields.length > 0) {
			remove(0);
		}
		DEFAULT_COLUMNS.forEach((col) => append(col));
	};

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<Label className="text-sm font-medium">
					{m.retro_column_custom_title()}
				</Label>
				{fields.length === 0 && (
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={loadDefaults}
					>
						{m.retro_column_load_defaults()}
					</Button>
				)}
			</div>

			<p className="text-sm text-muted-foreground">
				{m.retro_column_custom_description()}
			</p>

			{fields.length === 0 && (
				<div className="bg-muted/50 rounded-lg p-3">
					<p className="text-sm text-muted-foreground">
						{m.retro_column_default_hint()}
					</p>
				</div>
			)}

			<div className="space-y-2">
				{fields.map((field, index) => (
					<div
						key={field.id}
						className="flex items-start gap-2 p-3 border rounded-lg bg-card"
					>
						<div className="flex-1 space-y-2">
							<Controller
								name={`columns.${index}.title`}
								control={control}
								render={({ field }) => (
									<FormItem
										id={`column-title-${index}`}
										label={{ text: m.retro_column_title_label() }}
										errors={
											errors?.columns?.[index]?.title?.message
												? [errors.columns[index].title.message]
												: null
										}
									>
										<Input
											{...field}
											placeholder={m.retro_column_title_placeholder()}
										/>
									</FormItem>
								)}
							/>

							<Controller
								name={`columns.${index}.color`}
								control={control}
								render={({ field }) => (
									<FormItem
										id={`column-color-${index}`}
										label={{ text: m.retro_column_color_label() }}
										errors={
											errors?.columns?.[index]?.color?.message
												? [errors.columns[index].color.message]
												: null
										}
									>
										<div className="flex gap-2">
											<input
												type="color"
												value={field.value}
												onChange={(e) => field.onChange(e.target.value)}
												className="h-10 w-20 cursor-pointer rounded border"
											/>
											<Input
												value={field.value}
												onChange={(e) => field.onChange(e.target.value)}
												placeholder="#000000"
												className="flex-1"
											/>
										</div>
									</FormItem>
								)}
							/>

							<Controller
								name={`columns.${index}.order`}
								control={control}
								render={({ field }) => <input type="hidden" {...field} />}
							/>
						</div>

						<div className="flex flex-col gap-1 pt-6">
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => moveUp(index)}
								disabled={index === 0}
								title={m.retro_column_move_up()}
							>
								<ArrowUp className="h-4 w-4" />
							</Button>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => moveDown(index)}
								disabled={index === fields.length - 1}
								title={m.retro_column_move_down()}
							>
								<ArrowDown className="h-4 w-4" />
							</Button>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => remove(index)}
								title={m.retro_column_remove()}
								className="text-destructive hover:text-destructive"
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					</div>
				))}
			</div>

			<Button type="button" variant="outline" size="sm" onClick={addColumn}>
				<Plus className="h-4 w-4 mr-2" />
				{m.retro_column_add()}
			</Button>
		</div>
	);
}
