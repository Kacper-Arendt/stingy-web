import { Crown, Shield, User } from "lucide-react";

export function getInitials(name: string): string {
	return name
		.split(" ")
		.map((word) => word[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

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

// TODO: Translate this
export function getRoleLabel(role: string): string {
	switch (role?.toLowerCase()) {
		case "owner":
			return "Owner";
		case "admin":
			return "Admin";
		case "member":
			return "Member";
		default:
			return "Member";
	}
}

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
