import { createContext, useContext } from "react";
import type { TeamPermissions } from "../types/team";

const TeamPermissionsContext = createContext<TeamPermissions | null>(null);

interface TeamPermissionsProviderProps {
	children: React.ReactNode;
	permissions: TeamPermissions;
}

export function TeamPermissionsProvider({
	children,
	permissions,
}: TeamPermissionsProviderProps) {
	return (
		<TeamPermissionsContext.Provider value={permissions}>
			{children}
		</TeamPermissionsContext.Provider>
	);
}

export function useTeamPermissions(): TeamPermissions {
	const permissions = useContext(TeamPermissionsContext);
	if (!permissions) {
		throw new Error(
			"useTeamPermissions must be used within a TeamPermissionsProvider",
		);
	}
	return permissions;
}
