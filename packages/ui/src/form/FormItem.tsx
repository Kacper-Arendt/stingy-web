import { Field } from "@base-ui/react/field";
import styles from "./formItem.module.css";

interface IFormItem {
	label?: string;
	className?: string;
	children: React.ReactNode;
	name: string;
	description?: string;
}

export const FormItem: React.FC<IFormItem> = ({
	name,
	children,
	label,
	description,
}) => (
	<Field.Root name={name} className={styles.Field}>
		{label && <Field.Label className={styles.Label}>{label}</Field.Label>}
		{children}
		<Field.Error className={styles.Error} />
		{description && (
			<Field.Description className={styles.Description}>
				{description}
			</Field.Description>
		)}
	</Field.Root>
);
