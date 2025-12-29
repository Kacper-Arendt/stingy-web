import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import SystemLayout from "@/layouts/SystemLayout";

export const Route = createFileRoute("/_system")({
	beforeLoad: async ({ context }) => {
		if (!context.session.isAuthenticated) {
			try {
				const user = await context.session.revalidate();

				if (!user) throw new Error("Not authenticated");
			} catch {
				throw redirect({
					to: "/auth",
					search: {
						redirect: location.href,
					},
				});
			}
		}
	},
	pendingMs: 500,
	pendingComponent: () => <p>Loading...</p>,
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SystemLayout>
			<Outlet />
		</SystemLayout>
	);
}
