import { cn } from "@/lib/utils";

interface INoItems {
	title: string;
	description?: string;
	children?: React.ReactNode;
	className?: string;
}

export function NoItems({ title, description, children, className }: INoItems) {
	return (
		<div className={cn("text-center", className)}>
			<div className="text-6xl mb-4">🦥</div>
			<h4 className="text-lg font-medium mb-2">{title}</h4>
			{description && (
				<p className="text-muted-foreground mb-4">{description}</p>
			)}
			{children && children}
		</div>
	);
}
