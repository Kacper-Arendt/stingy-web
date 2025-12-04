import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface FormSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	children: ReactNode;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	submitLabel: string;
	cancelLabel?: string;
	loading?: boolean;
	footer?: ReactNode;
	className?: string;
}

export function FormSheet({
	open,
	onOpenChange,
	title,
	children,
	onSubmit,
	submitLabel,
	cancelLabel = "Cancel",
	loading = false,
	footer,
	className,
}: FormSheetProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="p-4">
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
				</SheetHeader>
				<form
					onSubmit={onSubmit}
					className={cn("flex flex-col gap-4 flex-1", className)}
				>
					{children}
					<SheetFooter className="mt-auto flex items-center flex-row gap-2">
						<Button
							variant="secondary"
							type="button"
							onClick={() => onOpenChange(false)}
						>
							{cancelLabel}
						</Button>
						<Button
							variant="default"
							type="submit"
							disabled={loading}
							className="flex-2"
						>
							{submitLabel}
						</Button>
						{footer}
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
}
