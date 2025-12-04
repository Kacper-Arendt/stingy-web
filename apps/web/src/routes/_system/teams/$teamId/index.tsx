import { Team } from "@/features/teams/Team";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_system/teams/$teamId/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Team teamId={Route.useParams().teamId} />;
}
