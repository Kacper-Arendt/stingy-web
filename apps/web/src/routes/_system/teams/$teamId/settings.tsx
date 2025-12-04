import { TeamSettings } from "@/features/teams/TeamSettings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_system/teams/$teamId/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <TeamSettings teamId={Route.useParams().teamId} />;
}
