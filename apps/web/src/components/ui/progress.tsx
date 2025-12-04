import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

interface ProgressProps
	extends React.ComponentProps<typeof ProgressPrimitive.Root> {
	indicatorClassName?: string;
	maxValue?: number;
}

function Progress({
	className,
	indicatorClassName,
	value,
	style,
	maxValue = 100,
	...props
}: ProgressProps) {
	return (
		<ProgressPrimitive.Root
			data-slot="progress"
			className={cn(
				"relative h-2 w-full overflow-hidden rounded-full",
				className,
			)}
			style={{
				backgroundColor:
					"var(--progress-track-color, color-mix(in oklab, rgb(var(--primary)) 20%, transparent))",
				...style,
			}}
			{...props}
		>
			<ProgressPrimitive.Indicator
				data-slot="progress-indicator"
				className={cn(
					"h-full w-full flex-1 transition-all duration-300 ease-in-out",
					indicatorClassName,
				)}
				style={{
					transform: `translateX(-${100 - (value || 0)}%)`,
					backgroundColor:
						"var(--progress-indicator-color, rgb(var(--primary)))",
				}}
			/>
		</ProgressPrimitive.Root>
	);
}

export { Progress };
