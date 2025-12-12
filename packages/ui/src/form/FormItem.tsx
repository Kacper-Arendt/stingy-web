import { Field } from "@base-ui/react/field";
import styles from "./formItem.module.css";

interface IFormItem {
	label?: string;
	className?: string;
	children: React.ReactNode;
	name: string;
}

export const FormItem = ({ name, children, label }: IFormItem) => (
	<Field.Root name={name} className={styles.Field}>
		{label && <Field.Label className={styles.Label}>{label}</Field.Label>}
		{children}
		<Field.Error className={styles.Error} />
	</Field.Root>
);
