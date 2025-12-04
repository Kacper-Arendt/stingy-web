import { Badge } from "@/components/ui/badge";
import * as m from "@/paraglide/messages";
import { CheckCircle, Clock, Eye, Play } from "lucide-react";

export type RetroStatus = "Planned" | "InProgress" | "Revealed" | "Finished";

interface RetroStatusBadgeProps {
	status: RetroStatus;
	showIcon?: boolean;
}

export function RetroStatusBadge({
	status,
	showIcon = true,
}: RetroStatusBadgeProps) {
	const getStatusConfig = (status: RetroStatus) => {
		switch (status) {
			case "Planned":
				return {
					label: m.retro_status_planned(),
					variant: "outline" as const,
					icon: Clock,
					className: "text-blue-600 border-blue-200 bg-blue-50",
				};
			case "InProgress":
				return {
					label: m.retro_status_inprogress(),
					variant: "default" as const,
					icon: Play,
					className: "text-amber-600 border-amber-200 bg-amber-50",
				};
			case "Revealed":
				return {
					label: m.retro_status_revealed(),
					variant: "secondary" as const,
					icon: Eye,
					className: "text-emerald-600 border-emerald-200 bg-emerald-50",
				};
			case "Finished":
				return {
					label: m.retro_status_finished(),
					variant: "outline" as const,
					icon: CheckCircle,
					className: "text-gray-600 border-gray-200 bg-gray-50",
				};
			default:
				return {
					label: status,
					variant: "outline" as const,
					icon: Clock,
					className: "text-gray-600 border-gray-200 bg-gray-50",
				};
		}
	};

	const config = getStatusConfig(status);
	const StatusIcon = config.icon;

	return (
		<Badge
			variant={config.variant}
			className={`${config.className} ${showIcon ? "gap-1" : ""}`}
		>
			{showIcon && <StatusIcon className="w-3 h-3" />}
			{config.label}
		</Badge>
	);
}
