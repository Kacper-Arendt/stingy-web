import Button from "@repo/ui/button";
import Card from "@repo/ui/card";
import Menu from "@repo/ui/menu";
import { Archive, ArrowRight, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import AppLink from "@/components/ui/AppLink";
import type { BudgetYear } from "@/features/budgets/types/budget";
import { useT } from "@/locales/useT";
import ArchiveYearDialog from "./ArchiveYearDialog";
import styles from "./BudgetYearListItem.module.css";
import DeleteYearDialog from "./DeleteYearDialog";

const BudgetYearListItem = ({ year }: { year: BudgetYear }) => {
	const { t } = useT();
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [archiveModalOpen, setArchiveModalOpen] = useState(false);

	return (
		<Card className={styles.card}>
			<Card.Header className={styles.header}>
				<Card.Title className={styles.title}>{year.value}</Card.Title>
				<div className={styles.actions}>
					<Menu.Root>
						<Menu.Trigger>
							<MoreVertical size={16} />
						</Menu.Trigger>
						<Menu.Portal>
							<Menu.Positioner>
								<Menu.Popup>
									<Menu.Item onClick={() => setArchiveModalOpen(true)}>
										<Archive size={16} />
										{t("archive")}
									</Menu.Item>
									<Menu.Separator />
									<Menu.Item onClick={() => setDeleteModalOpen(true)}>
										<Trash2 size={16} />
										{t("delete")}
									</Menu.Item>
								</Menu.Popup>
							</Menu.Positioner>
						</Menu.Portal>
					</Menu.Root>

					<AppLink to="/budgets/$budgetId" params={{ budgetId: year.budgetId }}>
						<Button
							variant="outline"
							size="small"
							rightIcon={<ArrowRight size={16} />}
							title={t("go_to_budget")}
							aria-label={t("go_to_budget")}
						/>
					</AppLink>
				</div>
			</Card.Header>

			<DeleteYearDialog
				open={deleteModalOpen}
				onOpenChange={setDeleteModalOpen}
				budgetId={year.budgetId}
				yearId={year.id}
			/>

			<ArchiveYearDialog
				open={archiveModalOpen}
				onOpenChange={setArchiveModalOpen}
				budgetId={year.budgetId}
				yearId={year.id}
			/>
		</Card>
	);
};

export default BudgetYearListItem;
