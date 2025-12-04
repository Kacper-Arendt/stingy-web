import * as React from "react";

interface LabeledProgressProps {
	percentage: number;
	label: React.ReactNode;
	colorCssVar: string; // e.g. --column-color-<id>
	widthClassName?: string; // e.g. w-[60%]
	className?: string;
}

export function LabeledProgress({
	percentage,
	label,
	colorCssVar,
	widthClassName = "w-[60%]",
	className,
}: LabeledProgressProps) {
	const trackStyle: React.CSSProperties = {
		background: `color-mix(in oklab, var(${colorCssVar}) 20%, transparent)`,
	};
	const indicatorStyle: React.CSSProperties = {
		width: `${Math.max(0, Math.min(100, percentage))}%`,
		background: `var(${colorCssVar})`,
	};

	return (
		<div
			className={`w-full flex flex-col items-center gap-2 ${className ?? ""}`}
		>
			<div className={widthClassName}>
				<div
					className="h-2 w-full rounded-full overflow-hidden"
					style={trackStyle}
				>
					<div
						className="h-full transition-all duration-300"
						style={indicatorStyle}
					/>
				</div>
			</div>
			<span className="text-sm text-muted-foreground">{label}</span>
		</div>
	);
}
