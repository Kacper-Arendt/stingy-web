import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import type { SessionContextValue } from "@/features/auth/session/SessionProvider";

interface MyRouterContext {
	queryClient: QueryClient;
	session: SessionContextValue;
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
