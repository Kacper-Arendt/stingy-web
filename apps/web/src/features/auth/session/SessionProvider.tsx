import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, type ReactNode, useContext } from "react";
import { getUser } from "@/features/auth/api/session.api";
import type { IUser } from "@/features/auth/types/session";

export interface SessionContextValue {
	isAuthenticated: boolean;
	user?: IUser | null;
	revalidate: () => Promise<IUser>;
}

const SessionContext = createContext<SessionContextValue | undefined>(
	undefined,
);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
	const query = useQuery<IUser>({
		queryKey: ["session"],
		queryFn: getUser,
		retry: 0,
		staleTime: 5000,
		gcTime: 5000,
	});

	const queryClient = useQueryClient();

	const revalidate = async () =>
		await queryClient.ensureQueryData({
			queryKey: ["session"],
			queryFn: getUser,
		});

	return (
		<SessionContext.Provider
			value={{
				user: query.data ?? null,
				isAuthenticated: !!query.data,
				revalidate,
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
