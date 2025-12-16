import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import type * as React from "react";
import merge from "../utils/merge";
import styles from "./checkbox-group.module.css";

// Root component
interface RootProps extends React.ComponentProps<typeof BaseCheckboxGroup> {
	className?: string;
}

const Root = ({ className, ...props }: RootProps) => {
	return (
		<BaseCheckboxGroup className={merge(styles.Root, className)} {...props} />
	);
};

// Export all components
const CheckboxGroup = {
	Root,
};

export default CheckboxGroup;
