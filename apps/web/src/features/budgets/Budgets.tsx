import { RouteWrapper } from "@/components/ui/routeWrapper/RouteWrapper";
import { useT } from "@/locales/useT";
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
				<div>Budgets</div>
			</RouteWrapper.Content>
		</RouteWrapper>
	);
};

export default Budgets;
