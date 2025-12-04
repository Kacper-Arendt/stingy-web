import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Header from "@/components/Header";
import { getUser } from "@/features/auth/api/session.api";

export const Route = createFileRoute("/_system")({
	beforeLoad: async ({ location }) => {
		try {
			await getUser();
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (err) {
			if (
				location.pathname !== "/auth/login" &&
				location.pathname !== "/auth/register"
			) {
				throw redirect({
					to: "/auth",
					search: {
						redirect: location.href,
					},
				});
			}
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col max-h-screen">
			{/* <Header /> */}

			<main className="overflow-auto flex-1 pt-4">
				<Outlet />
			</main>
		</div>
	);
}
