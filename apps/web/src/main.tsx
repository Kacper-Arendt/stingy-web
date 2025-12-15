import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider.tsx";
// Import translations
// Import the generated route tree
import { routeTree } from "./routeTree.gen.ts";
import "@repo/ui/styles.css";
import "./styles.css";

import { Toaster } from "@repo/ui/toast";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { I18nProvider } from "./locales/I18nProvider";

// Create a new router instance
const router = createRouter({
	routeTree,
	context: {
		...TanStackQueryProvider.getContext(),
	},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const { queryClient } = TanStackQueryProvider.getContext();
// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);

	root.render(
		<StrictMode>
			<div className="root">
				<I18nProvider>
					<TanStackQueryProvider.Provider queryClient={queryClient}>
						<ThemeProvider>
							<Toaster>
								<RouterProvider router={router} />
							</Toaster>
						</ThemeProvider>
					</TanStackQueryProvider.Provider>
				</I18nProvider>
			</div>
		</StrictMode>,
	);
}
