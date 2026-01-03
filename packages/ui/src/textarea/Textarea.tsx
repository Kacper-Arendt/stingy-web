import type { ComponentPropsWithoutRef } from "react";
import styles from "./textarea.module.css";

type TextareaProps = ComponentPropsWithoutRef<"textarea">;

const Textarea = (props: TextareaProps) => (
	<textarea className={styles.Textarea} {...props} />
);

export default Textarea;
