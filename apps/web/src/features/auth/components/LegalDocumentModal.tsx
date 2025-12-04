import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as m from "@/paraglide/messages";
import { useEffect, useState } from "react";

interface LegalDocumentModalProps {
	isOpen: boolean;
	onClose: () => void;
	documentType: "terms" | "privacy" | "cookies";
}

export const LegalDocumentModal = ({
	isOpen,
	onClose,
	documentType,
}: LegalDocumentModalProps) => {
	const [content, setContent] = useState<string>("");
	const [loading, setLoading] = useState(false);

	const getDocumentTitle = () => {
		switch (documentType) {
			case "terms":
				return m.register_terms_service();
			case "privacy":
				return m.register_privacy_policy();
			case "cookies":
				return m.register_cookie_policy();
			default:
				return "";
		}
	};

	const getDocumentPath = () => {
		switch (documentType) {
			case "terms":
				return "/legal/terms-of-service.md";
			case "privacy":
				return "/legal/privacy-policy.md";
			case "cookies":
				return "/legal/cookie-policy.md";
			default:
				return "";
		}
	};

	useEffect(() => {
		if (isOpen && documentType) {
			setLoading(true);
			fetch(getDocumentPath())
				.then((response) => response.text())
				.then((text) => {
					// Convert markdown to basic HTML for display
					const htmlContent = text
						.replace(
							/^# (.+)$/gm,
							'<h1 class="text-2xl font-bold mb-4">$1</h1>',
						)
						.replace(
							/^## (.+)$/gm,
							'<h2 class="text-xl font-semibold mb-3 mt-6">$1</h2>',
						)
						.replace(
							/^### (.+)$/gm,
							'<h3 class="text-lg font-medium mb-2 mt-4">$1</h3>',
						)
						.replace(
							/^\*\*(.+)\*\*$/gm,
							'<strong class="font-semibold">$1</strong>',
						)
						.replace(
							/\*\*(.+?)\*\*/g,
							'<strong class="font-semibold">$1</strong>',
						)
						.replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
						.replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>')
						.replace(/\n\n/g, '</p><p class="mb-3">')
						.replace(/\n/g, "<br>")
						.replace(/^(.+)$/gm, '<p class="mb-3">$1</p>');

					setContent(htmlContent);
				})
				.catch((error) => {
					console.error("Error loading document:", error);
					setContent("Error loading document. Please try again.");
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [isOpen, documentType]);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl max-h-[80vh]">
				<DialogHeader>
					<DialogTitle>{getDocumentTitle()}</DialogTitle>
				</DialogHeader>
				<ScrollArea className="h-[60vh] pr-4">
					{loading ? (
						<div className="flex items-center justify-center h-32">
							<div className="text-muted-foreground">{m.loading()}</div>
						</div>
					) : (
						<div
							className="prose prose-sm max-w-none dark:prose-invert"
							dangerouslySetInnerHTML={{ __html: content }}
						/>
					)}
				</ScrollArea>
				<div className="flex justify-end mt-4">
					<Button onClick={onClose}>{m.close()}</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
