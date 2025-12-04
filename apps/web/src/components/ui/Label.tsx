import { cn } from "@/lib/utils";

function Label({
	className,
	htmlFor,
	...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
	return (
		<label
			aria-labelledby={htmlFor}
			className={cn(
				"flex items-center gap-2 text-base leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				className,
			)}
			htmlFor={htmlFor}
			{...props}
		/>
	);
}

export { Label };
