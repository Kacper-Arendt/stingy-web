import { getUser } from "@/features/auth/api/session.api";
import type { IUser } from "@/features/auth/types/session";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { type ReactNode, createContext, useContext, useEffect } from "react";

export interface SessionContextValue {
	isAuthenticated: boolean;
	user?: IUser | null;
}

const SessionContext = createContext<SessionContextValue | undefined>(
	undefined,
);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const query = useQuery<IUser>({
		queryKey: ["session"],
		queryFn: getUser,
		retry: false,
	});

	useEffect(() => {
		if (
			query.error &&
			typeof query.error === "object" &&
			query.error !== null
		) {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const anyErr = query.error as any;
			const status =
				anyErr.status || anyErr.statusCode || anyErr?.response?.status;
			if (status === 401) {
				navigate({ to: "/auth", replace: true });
			}
		}
	}, [query.error, navigate]);

	const isAuthenticated = () => {
		if (query.isError) return false;
		if (query.isLoading) return false;
		return !!query.data;
	};

	return (
		<SessionContext.Provider
			value={{
				isAuthenticated: isAuthenticated() ?? false,
				user: query.data ?? null,
			}}
		>
			{children}
		</SessionContext.Provider>
	);
};

export const useSession = () => {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error("useSession must be used within a SessionProvider");
	}
	return context;
};
