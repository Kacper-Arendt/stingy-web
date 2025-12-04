import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { m } from "@/paraglide/messages";
import type React from "react";

export interface OnboardingSection {
	title: string;
	content: React.ReactNode;
}

interface OnboardingModalProps {
	open: boolean;
	onDone: () => void;
	onClosed: () => void;
	onTodo: () => void;
	title: string;
	sections: OnboardingSection[];
}

export function OnboardingModal({
	open,
	onDone,
	onClosed,
	onTodo,
	title,
	sections,
}: OnboardingModalProps) {
	return (
		<Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClosed()}>
			<DialogContent className=" max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>

				<div className="space-y-6">
					{sections.map((section, index) => (
						<div key={index} className="space-y-2">
							<h3 className="font-semibold text-lg">{section.title}</h3>
							<div className="text-muted-foreground space-y-2">
								{section.content}
							</div>
						</div>
					))}
				</div>

				<DialogFooter className="flex-col sm:flex-row gap-2">
					<Button variant="ghost" onClick={onTodo}>
						{m.onboarding_maybe_later()}
					</Button>
					<Button variant="outline" onClick={onClosed}>
						{m.onboarding_dont_show_again()}
					</Button>
					<Button onClick={onDone}>{m.onboarding_got_it()}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
