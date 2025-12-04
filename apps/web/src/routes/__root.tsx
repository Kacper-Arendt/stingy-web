import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import type { QueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<Outlet />
		</>
	),
	pendingComponent: () => (
		<div>
			<Loader2 className="animate-spin" />
		</div>
	),
});
