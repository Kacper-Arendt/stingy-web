import { RouteWrapper } from "@/components/ui/routeWrapper/RouteWrapper";
import { useT } from "@/locales/useT";
import BudgetsList from "./components/BudgetsList/BudgetsList";
import { CreateBudgetDialog } from "./components/CreateBudgetDialog/CreateBudgetDialog";

const Budgets = () => {
	const { t } = useT();
	return (
		<RouteWrapper>
			<RouteWrapper.Header
				title={t("budgets_title")}
				actions={<CreateBudgetDialog />}
			/>
			<RouteWrapper.Content>
				<BudgetsList />
			</RouteWrapper.Content>
		</RouteWrapper>
	);
};

export default Budgets;
