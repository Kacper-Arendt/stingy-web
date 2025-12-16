import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_system/")({
	component: TeamsPage,
});

function TeamsPage() {
	// return <Teams />;
	return <div>Hello World</div>;
}
