import { createFileRoute } from "@tanstack/react-router";
import { Login } from "@/features/auth/Login";

export const Route = createFileRoute("/auth/")({
	// component: Login,
	component: () => <div>Hello World auth</div>,
});
