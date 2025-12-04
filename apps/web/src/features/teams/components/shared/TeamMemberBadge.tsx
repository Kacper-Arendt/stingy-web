import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
	getRoleBadgeVariant,
	getRoleIcon,
	getRoleLabel,
} from "../../utils/teamUtils";

export function TeamMemberBadge({
	role,
	className,
}: {
	role: string;
	className?: string;
}) {
	return (
		<Badge variant={getRoleBadgeVariant(role)}>
			<div className={cn("flex items-center space-x-1", className)}>
				{getRoleIcon(role)}
				<span className="capitalize">{getRoleLabel(role)}</span>
			</div>
		</Badge>
	);
}
