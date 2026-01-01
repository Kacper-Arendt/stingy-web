import type { TeamPermissions, TeamRole } from "../types/team";

export function getDefaultPermissionsByRole(role: TeamRole): TeamPermissions {
	const basePermissions: TeamPermissions = {
		canEditTeam: false,
		canDeleteTeam: false,
		canManageParticipants: false,
		canChangeUserRoles: false,
		canInviteUsers: false,
	};

	switch (role) {
		case "owner":
			return {
				canEditTeam: true,
				canDeleteTeam: true,
				canManageParticipants: true,
				canChangeUserRoles: true,
				canInviteUsers: true,
			};

		case "admin":
			return {
				...basePermissions,
				canEditTeam: true,
				canManageParticipants: true,
				canInviteUsers: true,
			};

		case "member":
			return {
				...basePermissions,
			};

		default:
			return basePermissions;
	}
}

export function hasManagementPermissions(
	permissions: TeamPermissions,
): boolean {
	return (
		permissions.canEditTeam ||
		permissions.canDeleteTeam ||
		permissions.canManageParticipants ||
		permissions.canChangeUserRoles ||
		permissions.canInviteUsers
	);
}

export function hasAdminPermissions(permissions: TeamPermissions): boolean {
	return (
		permissions.canDeleteTeam ||
		permissions.canChangeUserRoles ||
		permissions.canManageParticipants
	);
}

export function getTeamPermissionsWithFallback(
	permissions: TeamPermissions | undefined,
	userRole: TeamRole,
): TeamPermissions {
	return permissions || getDefaultPermissionsByRole(userRole);
}
