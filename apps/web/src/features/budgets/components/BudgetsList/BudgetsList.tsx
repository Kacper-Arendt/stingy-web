import Skeleton from "@repo/ui/skeleton";
import BudgetListItem from "@/features/budgets/components/BudgetsList/BudgetListItem";
import { useBudgets } from "@/features/budgets/hooks/useBudgets";
import styles from "./BudgetsList.module.css";

const BudgetsList = () => {
	const { data: budgets, isLoading } = useBudgets();

	if (isLoading) return <Skeleton width="100%" height="200px" />;

	if (budgets?.length === 0) return null;

	return (
		<div className={styles.list}>
			{budgets?.map((budget) => (
				<BudgetListItem key={budget.id} budget={budget} />
			))}
		</div>
	);
};

export default BudgetsList;
