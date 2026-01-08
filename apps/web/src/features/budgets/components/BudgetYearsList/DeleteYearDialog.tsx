import Button from "@repo/ui/button";
import Dialog from "@repo/ui/dialog";
import { useToastManager } from "@repo/ui/toast";
import { useDeleteBudgetYear } from "@/features/budgets/hooks/useDeleteBudgetYear";
import { useT } from "@/locales/useT";
import styles from "./BudgetYearListItem.module.css";

interface DeleteYearDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	budgetId: string;
	yearId: string;
}

const DeleteYearDialog = ({
	open,
	onOpenChange,
	budgetId,
	yearId,
}: DeleteYearDialogProps) => {
	const { t } = useT();
	const toastManager = useToastManager();

	const deleteMutation = useDeleteBudgetYear({
		onSuccess: () => {
			toastManager.add({
				title: t("budget_year_delete_success"),
				type: "success",
			});
			onOpenChange(false);
		},
		onError: () => {
			toastManager.add({
				title: t("budget_year_delete_error"),
				type: "error",
			});
		},
	});

	const handleDelete = () => {
		deleteMutation.mutate({
			budgetId,
			yearId,
		});
	};

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Backdrop />
				<Dialog.Popup>
					<Dialog.Close />
					<Dialog.Title>{t("budget_year_delete_confirm_title")}</Dialog.Title>
					<Dialog.Description>
						{t("budget_year_delete_confirm_description")}
					</Dialog.Description>
					<div className={styles.modalActions}>
						<Button
							variant="outline"
							onClick={() => onOpenChange(false)}
							disabled={deleteMutation.isPending}
						>
							{t("close")}
						</Button>
						<Button
							variant="danger"
							onClick={handleDelete}
							disabled={deleteMutation.isPending}
						>
							{deleteMutation.isPending ? t("deleting") : t("delete")}
						</Button>
					</div>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default DeleteYearDialog;
