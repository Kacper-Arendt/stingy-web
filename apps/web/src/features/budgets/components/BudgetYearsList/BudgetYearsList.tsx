import Skeleton from "@repo/ui/skeleton";
import { useBudgetYears } from "@/features/budgets/hooks/useBudgetYears";
import BudgetYearListItem from "./BudgetYearListItem";
import styles from "./BudgetYearsList.module.css";

const BudgetYearsList = ({ budgetId }: { budgetId: string }) => {
	const { data: years, isLoading } = useBudgetYears(budgetId);

	if (isLoading) return <Skeleton width="100%" height="200px" />;

	if (years?.length === 0) return null;

	return (
		<div className={styles.list}>
			{years?.map((year) => (
				<BudgetYearListItem key={year.id} year={year} />
			))}
		</div>
	);
};

export default BudgetYearsList;
