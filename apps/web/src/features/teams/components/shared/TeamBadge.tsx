import Badge from "@repo/ui/badge";
import { useRoleTranslation } from "@/features/teams/hooks/useRoleTranslation";
import { getRoleBadgeVariant } from "@/features/teams/utils/teamUtils";

interface TeamBadgeProps {
	role: string;
}

const TeamBadge = ({ role }: TeamBadgeProps) => {
	const getRoleTranslation = useRoleTranslation();
	const variant = getRoleBadgeVariant(role);

	return <Badge variant={variant}>{getRoleTranslation(role)}</Badge>;
};

export default TeamBadge;
