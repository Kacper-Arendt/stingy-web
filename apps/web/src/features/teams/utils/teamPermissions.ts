import type { TeamPermissions, TeamRole } from "../types/team";

/**
 * Get default permissions based on team role
 * Used as fallback when permissions are not available from API
 */
export function getDefaultPermissionsByRole(role: TeamRole): TeamPermissions {
	const basePermissions: TeamPermissions = {
		canEditTeam: false,
		canDeleteTeam: false,
		canManageParticipants: false,
		canChangeUserRoles: false,
		canCreateRetro: false,
		canInviteUsers: false,
	};

	switch (role) {
		case "owner":
			return {
				canEditTeam: true,
				canDeleteTeam: true,
				canManageParticipants: true,
				canChangeUserRoles: true,
				canCreateRetro: true,
				canInviteUsers: true,
			};

		case "admin":
			return {
				...basePermissions,
				canEditTeam: true,
				canManageParticipants: true,
				canCreateRetro: true,
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

/**
 * Check if user has any management permissions
 */
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

/**
 * Check if user has any admin-level permissions
 */
export function hasAdminPermissions(permissions: TeamPermissions): boolean {
	return (
		permissions.canDeleteTeam ||
		permissions.canChangeUserRoles ||
		permissions.canManageParticipants
	);
}

/**
 * Get permissions with fallback to role-based defaults
 */
export function getTeamPermissionsWithFallback(
	permissions: TeamPermissions | undefined,
	userRole: TeamRole,
): TeamPermissions {
	return permissions || getDefaultPermissionsByRole(userRole);
}
