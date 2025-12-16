import { Meter as BaseMeter } from "@base-ui/react/meter";
import type * as React from "react";
import merge from "../utils/merge";
import styles from "./meter.module.css";

// Root component
interface RootProps extends React.ComponentProps<typeof BaseMeter.Root> {
	className?: string;
}

const Root = ({ className, ...props }: RootProps) => {
	return (
		<BaseMeter.Root className={merge(styles.Root, className)} {...props} />
	);
};

// ValueText wrapper component (helper component)
interface ValueTextProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const ValueText = ({ className, ...props }: ValueTextProps) => {
	return <div className={merge(styles.ValueText, className)} {...props} />;
};

// Export all components
const Meter = {
	Root,
	ValueText,
};

export default Meter;
