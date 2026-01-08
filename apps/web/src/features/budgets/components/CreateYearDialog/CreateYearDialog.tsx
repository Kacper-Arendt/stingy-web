import Button from "@repo/ui/button";
import Loader from "@repo/ui/loader";
import { Plus } from "lucide-react";
import { lazy, Suspense } from "react";
import { Modal } from "@/components/ui/Modal";
import { useT } from "@/locales/useT";

const CreateYearDialogContent = lazy(
	() => import("./CreateYearDialogContent.tsx"),
);

export function CreateYearDialog({ budgetId }: { budgetId: string }) {
	const { t } = useT();

	return (
		<Modal
			trigger={<Button leftIcon={<Plus />}>{t("add_year")}</Button>}
			title={t("add_year")}
		>
			<Suspense fallback={<Loader />}>
				<CreateYearDialogContent budgetId={budgetId} />
			</Suspense>
		</Modal>
	);
}
