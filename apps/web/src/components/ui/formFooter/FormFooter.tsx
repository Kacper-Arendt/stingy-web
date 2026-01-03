import Button from "@repo/ui/button";
import { useT } from "@/locales/useT";
import styles from "./formFooter.module.css";

interface FormFooterProps {
	onClose: () => void;
	submitText: string;
	isPending?: boolean;
	closeText?: string;
}

export function FormFooter({
	onClose,
	submitText,
	isPending = false,
	closeText,
}: FormFooterProps) {
	const { t } = useT();

	return (
		<div className={styles.ButtonGroup}>
			<Button
				type="button"
				variant="outline"
				onClick={onClose}
				disabled={isPending}
			>
				{closeText ?? t("close")}
			</Button>
			<Button type="submit" variant="primary" disabled={isPending}>
				{submitText}
			</Button>
		</div>
	);
}
