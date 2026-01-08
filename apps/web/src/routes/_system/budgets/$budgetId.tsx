import { createFileRoute } from "@tanstack/react-router";
import { RouteWrapper } from "@/components/ui/routeWrapper/RouteWrapper";
import BudgetYearsList from "@/features/budgets/components/BudgetYearsList/BudgetYearsList";
import { CreateYearDialog } from "@/features/budgets/components/CreateYearDialog/CreateYearDialog";
import { useT } from "@/locales/useT";

export const Route = createFileRoute("/_system/budgets/$budgetId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { budgetId } = Route.useParams();
	const { t } = useT();

	return (
		<RouteWrapper>
			<RouteWrapper.Header
				title={t("budget_years_title")}
				actions={<CreateYearDialog budgetId={budgetId} />}
			/>
			<RouteWrapper.Content>
				<BudgetYearsList budgetId={budgetId} />
			</RouteWrapper.Content>
		</RouteWrapper>
	);
}
