import type { ReactNode } from "react";

interface FormStatusMessageProps {
	type: "success" | "error";
	children: ReactNode;
	className?: string;
}

export const FormStatusMessage = ({
	type,
	children,
	className,
}: FormStatusMessageProps) => {
	const color = type === "success" ? "text-green-600" : "text-red-600";
	return (
		<div className={`${color} text-sm ${className ?? ""}`.trim()}>
			{children}
		</div>
	);
};
