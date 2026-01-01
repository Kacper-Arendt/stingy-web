import { createFileRoute } from "@tanstack/react-router";
import Teams from "@/features/teams/Teams";

export const Route = createFileRoute("/_system/")({
	component: Teams,
});
