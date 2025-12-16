import { createFileRoute, Outlet } from "@tanstack/react-router";
import SystemLayout from "@/layouts/SystemLayout";

export const Route = createFileRoute("/_system")({
	// beforeLoad: async ({ location }) => {
	// 	try {
	// 		await getUser();
	// 		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// 	} catch (err) {
	// 		if (
	// 			location.pathname !== "/auth/login" &&
	// 			location.pathname !== "/auth/register"
	// 		) {
	// 			throw redirect({
	// 				to: "/auth",
	// 				search: {
	// 					redirect: location.href,
	// 				},
	// 			});
	// 		}
	// 	}
	// },
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SystemLayout>
			<Outlet />
		</SystemLayout>
	);
}
