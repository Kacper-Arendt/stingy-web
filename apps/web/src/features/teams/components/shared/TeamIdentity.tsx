import { Badge } from "@/components/ui/badge";
import { getRoleBadgeVariant, getRoleLabel } from "../../utils/teamUtils";

export function TeamIdentity({
	initials,
	name,
	description,
	role,
}: {
	initials: string;
	name: string;
	description: string;
	role?: string;
}) {
	return (
		<div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
			<div className="flex flex-col md:flex-row items-start gap-4">
				{/* Team Avatar */}
				<div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
					{initials}
				</div>

				{/* Team Details */}
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<h1 className="text-3xl font-bold tracking-tight">{name}</h1>
						{role && (
							<Badge variant={getRoleBadgeVariant(role)}>
								{getRoleLabel(role)}
							</Badge>
						)}
					</div>
					<p className="text-lg text-muted-foreground max-w-2xl">
						{description}
					</p>
				</div>
			</div>
		</div>
	);
}
