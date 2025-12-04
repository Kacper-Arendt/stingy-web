import { cn } from "@/lib/utils";
import * as m from "@/paraglide/messages";

export function SomethingWentWrong({
	className,
	description,
}: {
	className?: string;
	description?: string;
}) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center h-full",
				className,
			)}
		>
			<div className="text-6xl mb-4 animate-bounce">🐛</div>
			<h4 className="text-lg font-medium mb-2">{m.something_went_wrong()}</h4>
			{description && (
				<p className="text-muted-foreground mb-4">{description}</p>
			)}
		</div>
	);
}
