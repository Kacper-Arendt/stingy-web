import styles from "./formFields.module.css";

interface FormFieldsProps {
	children: React.ReactNode;
}

export function FormFields({ children }: FormFieldsProps) {
	return <div className={styles.FormFields}>{children}</div>;
}
