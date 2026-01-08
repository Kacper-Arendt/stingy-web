import Button from "@repo/ui/button";
import Dialog from "@repo/ui/dialog";
import { useToastManager } from "@repo/ui/toast";
import { useArchiveBudgetYear } from "@/features/budgets/hooks/useArchiveBudgetYear";
import { useT } from "@/locales/useT";
import styles from "./BudgetYearListItem.module.css";

interface ArchiveYearDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	budgetId: string;
	yearId: string;
}

const ArchiveYearDialog = ({
	open,
	onOpenChange,
	budgetId,
	yearId,
}: ArchiveYearDialogProps) => {
	const { t } = useT();
	const toastManager = useToastManager();

	const archiveMutation = useArchiveBudgetYear({
		onSuccess: () => {
			toastManager.add({
				title: t("budget_year_archive_success"),
				type: "success",
			});
			onOpenChange(false);
		},
		onError: () => {
			toastManager.add({
				title: t("budget_year_archive_error"),
				type: "error",
			});
		},
	});

	const handleArchive = () => {
		archiveMutation.mutate({
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
					<Dialog.Title>{t("budget_year_archive_confirm_title")}</Dialog.Title>
					<Dialog.Description>
						{t("budget_year_archive_confirm_description")}
					</Dialog.Description>
					<div className={styles.modalActions}>
						<Button
							variant="outline"
							onClick={() => onOpenChange(false)}
							disabled={archiveMutation.isPending}
						>
							{t("close")}
						</Button>
						<Button
							variant="primary"
							onClick={handleArchive}
							disabled={archiveMutation.isPending}
						>
							{archiveMutation.isPending ? t("archiving") : t("archive")}
						</Button>
					</div>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default ArchiveYearDialog;
