import { Radio as BaseRadio } from "@base-ui/react/radio";
import type * as React from "react";
import merge from "../utils/merge";
import styles from "./radio.module.css";

// Root component
interface RootProps extends React.ComponentProps<typeof BaseRadio.Root> {
	className?: string;
}

const Root = ({ className, ...props }: RootProps) => {
	return (
		<BaseRadio.Root className={merge(styles.Root, className)} {...props} />
	);
};

// Indicator component
interface IndicatorProps
	extends React.ComponentProps<typeof BaseRadio.Indicator> {
	className?: string;
}

const Indicator = ({ className, ...props }: IndicatorProps) => {
	return (
		<BaseRadio.Indicator
			className={merge(styles.Indicator, className)}
			{...props}
		/>
	);
};

// Export all components
const Radio = {
	Root,
	Indicator,
};

export default Radio;
