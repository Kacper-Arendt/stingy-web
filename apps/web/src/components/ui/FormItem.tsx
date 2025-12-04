import { Label } from "./Label";
import RequiredIndicator from "./RequiredIndicator";

interface FormItemProps {
	id: string;
	children: React.ReactNode;
	label?: {
		text: string;
		required?: boolean;
	};
	errors?: string[] | null;
	className?: string;
}

export const FormItem = ({
	label,
	children,
	errors,
	id,
	className,
}: FormItemProps) => {
	return (
		<div className={`flex flex-col gap-1 ${className || ""}`}>
			{label && (
				<Label htmlFor={id} className="text-right text-base">
					{label.text}
					{label.required && <RequiredIndicator />}
				</Label>
			)}
			{children}
			{errors?.map((err) => (
				<p key={err} id={`${id}-error`} className="text-sm text-red-500">
					{err}
				</p>
			))}
		</div>
	);
};
