import Me from "@/features/userProfiles/Me";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_system/users/me")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Me />;
}
