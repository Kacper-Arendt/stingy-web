import { Form, FormItem } from "@repo/ui/form";
import { useToastManager } from "@repo/ui/toast";
import { FormFields } from "@/components/ui/formFields/FormFields";
import { FormFooter } from "@/components/ui/formFooter/FormFooter";
import { useModal } from "@/components/ui/Modal";
import { useBudgetYears } from "@/features/budgets/hooks/useBudgetYears";
import { useCreateBudgetYear } from "@/features/budgets/hooks/useCreateBudgetYear";
import { CreateYearSchema } from "@/features/budgets/schemas/budget.schema";
import { useFormErrors } from "@/hooks/useFormErrors";
import { useT } from "@/locales/useT";
import { YearPicker } from "./YearPicker";

const currentYear = new Date().getFullYear();
const minYear = currentYear - 3;
const maxYear = currentYear + 10;

function getAvailableYears(
	existingYears: Array<{ value: number }> | undefined,
): number[] {
	const existingYearValues = existingYears?.map((year) => year.value) ?? [];
	const availableYears: number[] = [];

	for (let year = minYear; year <= maxYear; year++) {
		if (!existingYearValues.includes(year)) {
			availableYears.push(year);
		}
	}

	return availableYears;
}

function getDefaultYear(availableYears: number[]): number {
	if (availableYears.length === 0) return currentYear;

	if (availableYears.includes(currentYear)) return currentYear;

	return availableYears.reduce((closest, year) => {
		const currentDiff = Math.abs(year - currentYear);
		const closestDiff = Math.abs(closest - currentYear);
		return currentDiff < closestDiff ? year : closest;
	});
}

export default function CreateYearDialogContent({
	budgetId,
}: {
	budgetId: string;
}) {
	const { t } = useT();
	const { close } = useModal();
	const { errors, setFormErrors, clearErrors } = useFormErrors();
	const toastManager = useToastManager();
	const { data: existingYears } = useBudgetYears(budgetId);

	const availableYears = getAvailableYears(existingYears);
	const defaultYear = getDefaultYear(availableYears);
	const hasRemovedYears = existingYears && existingYears.length > 0;

	const createYearMutation = useCreateBudgetYear({
		onSuccess: () => {
			toastManager.add({
				title: t("create_success"),
				type: "success",
			});
			close();
			clearErrors();
		},
		onError: () => {
			toastManager.add({
				title: t("create_error"),
				type: "error",
			});
		},
	});

	const submitForm = async (formValues: unknown) => {
		const formData = formValues as { value: string | number };
		const result = CreateYearSchema.safeParse({
			value:
				typeof formData.value === "string"
					? Number(formData.value)
					: formData.value,
			budgetId,
		});

		if (!result.success) return setFormErrors(result.error);

		clearErrors();

		const data = result.data;
		await createYearMutation.mutateAsync({
			budgetId,
			data: {
				value: data.value,
				budgetId: data.budgetId,
			},
		});
	};

	const handleClose = () => {
		clearErrors();
		close();
	};

	return (
		<Form errors={errors} onFormSubmit={submitForm}>
			<FormFields>
				<FormItem
					name="value"
					description={
						hasRemovedYears
							? t("create_year_removed_years_description")
							: undefined
					}
				>
					<YearPicker
						defaultValue={defaultYear}
						years={availableYears}
						name="value"
					/>
				</FormItem>

				<FormFooter
					onClose={handleClose}
					submitText={t("add")}
					isPending={createYearMutation.isPending}
				/>
			</FormFields>
		</Form>
	);
}
