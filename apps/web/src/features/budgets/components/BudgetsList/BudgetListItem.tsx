import Card from "@repo/ui/card";
import { Calendar, Users } from "lucide-react";
import AppLink from "@/components/ui/AppLink";
import type { Budget } from "@/features/budgets/types/budget";
import { useDate } from "@/hooks/useDate";
import { useT } from "@/locales/useT";
import styles from "./BudgetListItem.module.css";

const BudgetListItem = ({ budget }: { budget: Budget }) => {
	const { t } = useT();
	const { defaultFormatDate } = useDate();

	return (
		<Card className={styles.card}>
			<Card.Header>
				<Card.Title>
					<AppLink to="/budgets/$budgetId" params={{ budgetId: budget.id }}>
						{budget.name}
					</AppLink>
				</Card.Title>
				{budget.description && (
					<Card.Description className={styles.description}>
						{budget.description}
					</Card.Description>
				)}
				<div className={styles.budgetMeta}>
					<div className={styles.memberCount} title={t("member_count")}>
						<Users size={16} aria-label={t("member_count")} />
						<span>{budget.members.length}</span>
					</div>
					<div className={styles.createdDate} title={t("created")}>
						<Calendar size={16} aria-label={t("created")} />
						<span>{defaultFormatDate(new Date(budget.createdAt))}</span>
					</div>
				</div>
			</Card.Header>
		</Card>
	);
};

export default BudgetListItem;
