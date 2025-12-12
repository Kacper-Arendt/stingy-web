import { Form as BaseForm, type FormProps } from "@base-ui/react/form";
import styles from "./form.module.css";

export interface IForm extends FormProps {}

export const Form = ({ errors, onFormSubmit, children }: IForm) => (
	<BaseForm className={styles.Form} errors={errors} onFormSubmit={onFormSubmit}>
		{children}
	</BaseForm>
);
