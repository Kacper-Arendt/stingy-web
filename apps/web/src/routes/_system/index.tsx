import { createFileRoute } from "@tanstack/react-router";
import Budgets from "@/features/budgets/Budgets";

export const Route = createFileRoute("/_system/")({
	component: Budgets,
});
