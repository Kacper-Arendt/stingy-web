import * as m from "@/paraglide/messages";
import { Crown, Shield, User } from "lucide-react";

/**
 * Generate initials from a name string
 */
export function getInitials(name: string): string {
	return name
		.split(" ")
		.map((word) => word[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

/**
 * Get badge variant for team role
 */
export function getRoleBadgeVariant(
	role: string,
): "default" | "secondary" | "outline" | "gold" {
	switch (role?.toLowerCase()) {
		case "owner":
			return "gold";
		case "admin":
			return "secondary";
		case "member":
			return "outline";
		default:
			return "outline";
	}
}

/**
 * Get translated label for team role
 */
export function getRoleLabel(role: string): string {
	switch (role?.toLowerCase()) {
		case "owner":
			return m.teams_owner();
		case "admin":
			return m.teams_admin();
		case "member":
			return m.teams_member();
		default:
			return m.teams_member();
	}
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString();
}

export const getRoleIcon = (role: string) => {
	switch (role.toLowerCase()) {
		case "owner":
			return <Crown className="w-3 h-3" />;
		case "admin":
			return <Shield className="w-3 h-3" />;
		case "member":
		default:
			return <User className="w-3 h-3" />;
	}
};
