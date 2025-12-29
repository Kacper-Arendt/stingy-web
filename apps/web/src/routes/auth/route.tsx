import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthLayout } from "@/layouts/AuthLayout";

export const Route = createFileRoute("/auth")({
	beforeLoad: async ({ context }) => {
		const user = await context.session.revalidate();

		if (user) {
			throw redirect({
				to: "/",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	pendingMs: 500,
	pendingComponent: () => <p>Loading...</p>,
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
}
