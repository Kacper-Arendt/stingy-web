import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";
import type * as React from "react";
import merge from "../utils/merge";
import styles from "./collapsible.module.css";

function ChevronDownIcon() {
	return <ChevronDown size={16} />;
}

// Root component
interface RootProps extends React.ComponentProps<typeof BaseCollapsible.Root> {
	className?: string;
}

const Root = ({ className, ...props }: RootProps) => {
	return (
		<BaseCollapsible.Root
			className={merge(styles.Root, className)}
			{...props}
		/>
	);
};

// Trigger component
interface TriggerProps
	extends React.ComponentProps<typeof BaseCollapsible.Trigger> {
	className?: string;
}

const Trigger = ({ className, children, ...props }: TriggerProps) => {
	return (
		<BaseCollapsible.Trigger
			className={merge(styles.Trigger, className)}
			{...props}
		>
			{children}
			<span className={styles.Icon}>
				<ChevronDownIcon />
			</span>
		</BaseCollapsible.Trigger>
	);
};

// Panel component (Content)
interface PanelProps
	extends React.ComponentProps<typeof BaseCollapsible.Panel> {
	className?: string;
}

const Panel = ({ className, ...props }: PanelProps) => {
	return (
		<BaseCollapsible.Panel
			className={merge(styles.Panel, className)}
			{...props}
		/>
	);
};

// Content alias for Panel (for convenience)
const Content = Panel;

// Export all components
const Collapsible = {
	Root,
	Trigger,
	Panel,
	Content, // Alias for Panel
};

export default Collapsible;
