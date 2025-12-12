import { Input as BaseInput, type InputProps } from "@base-ui/react";
import styles from "./input.module.css";

const Input = (props: InputProps) => (
	<BaseInput className={styles.Input} {...props} />
);

export default Input;
