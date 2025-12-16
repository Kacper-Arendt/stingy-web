import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import type * as React from "react";
import merge from "../utils/merge";
import styles from "./checkbox.module.css";

function CheckIcon() {
	return <Check size={14} />;
}

// Root component
interface RootProps extends React.ComponentProps<typeof BaseCheckbox.Root> {
	className?: string;
}

const Root = ({ className, ...props }: RootProps) => {
	return (
		<BaseCheckbox.Root className={merge(styles.Root, className)} {...props} />
	);
};

// Indicator component
interface IndicatorProps
	extends React.ComponentProps<typeof BaseCheckbox.Indicator> {
	className?: string;
}

const Indicator = ({ className, children, ...props }: IndicatorProps) => {
	return (
		<BaseCheckbox.Indicator
			className={merge(styles.Indicator, className)}
			{...props}
		>
			{children || <CheckIcon />}
		</BaseCheckbox.Indicator>
	);
};

// Export all components
const Checkbox = {
	Root,
	Indicator,
};

export default Checkbox;
