import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type * as React from "react";
import merge from "../utils/merge";
import styles from "./switch.module.css";

// Root component
interface RootProps extends React.ComponentProps<typeof BaseSwitch.Root> {
	className?: string;
}

const Root = ({ className, ...props }: RootProps) => {
	return (
		<BaseSwitch.Root className={merge(styles.Root, className)} {...props} />
	);
};

// Thumb component
interface ThumbProps extends React.ComponentProps<typeof BaseSwitch.Thumb> {
	className?: string;
}

const Thumb = ({ className, ...props }: ThumbProps) => {
	return (
		<BaseSwitch.Thumb className={merge(styles.Thumb, className)} {...props} />
	);
};

// Indicator alias for Thumb (for convenience)
const Indicator = Thumb;

const Switch = {
	Root,
	Thumb,
	Indicator, // Alias for Thumb
};

export default Switch;
