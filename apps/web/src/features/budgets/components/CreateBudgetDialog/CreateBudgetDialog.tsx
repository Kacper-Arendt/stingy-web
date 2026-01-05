import Button from "@repo/ui/button";
import Loader from "@repo/ui/loader";
import { Plus } from "lucide-react";
import { lazy, Suspense } from "react";
import { Modal } from "@/components/ui/Modal";
import { useT } from "@/locales/useT";

const CreateBudgetDialogContent = lazy(
	() => import("./CreateBudgetDialogContent.tsx"),
);

export function CreateBudgetDialog() {
	const { t } = useT();

	return (
		<Modal
			trigger={<Button leftIcon={<Plus />}>{t("create_budget")}</Button>}
			title={t("create_budget")}
		>
			<Suspense fallback={<Loader />}>
				<CreateBudgetDialogContent />
			</Suspense>
		</Modal>
	);
}
