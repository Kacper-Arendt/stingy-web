import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_system/budgets/$budgetId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { budgetId } = Route.useParams();
	return <div>Hello "/_system/budgets/{budgetId}"!</div>;
}
