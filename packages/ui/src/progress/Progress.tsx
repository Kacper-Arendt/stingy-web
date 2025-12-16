import { Progress as BaseProgress } from "@base-ui/react/progress";
import type * as React from "react";
import merge from "../utils/merge";
import styles from "./progress.module.css";

// Root component
interface RootProps extends React.ComponentProps<typeof BaseProgress.Root> {
	className?: string;
}

const Root = ({ className, ...props }: RootProps) => {
	return (
		<BaseProgress.Root className={merge(styles.Root, className)} {...props} />
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
const Progress = {
	Root,
	ValueText,
};

export default Progress;
