import * as React from "react";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const textareaVariants = cva(
	"border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
	{
		variants: {
			size: {
				sm: "h-16",
				md: "h-32",
				lg: "h-48",
			},
		},
	},
);

function Textarea({
	className,
	size = "md",
	...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(textareaVariants({ size, className }))}
			{...props}
		/>
	);
}

export { Textarea };
