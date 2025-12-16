import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type * as React from "react";
import merge from "../utils/merge";
import styles from "./tabs.module.css";

// Root component
interface RootProps extends React.ComponentProps<typeof BaseTabs.Root> {
	className?: string;
}

const Root = ({ className, ...props }: RootProps) => {
	return <BaseTabs.Root className={merge(styles.Root, className)} {...props} />;
};

// List component
interface ListProps extends React.ComponentProps<typeof BaseTabs.List> {
	className?: string;
}

const List = ({ className, ...props }: ListProps) => {
	return <BaseTabs.List className={merge(styles.List, className)} {...props} />;
};

// Tab component (Trigger)
interface TabProps extends React.ComponentProps<typeof BaseTabs.Tab> {
	className?: string;
}

const Tab = ({ className, ...props }: TabProps) => {
	return <BaseTabs.Tab className={merge(styles.Tab, className)} {...props} />;
};

// Trigger alias for Tab (for convenience)
const Trigger = Tab;

// Panel component (Content)
interface PanelProps extends React.ComponentProps<typeof BaseTabs.Panel> {
	className?: string;
}

const Panel = ({ className, ...props }: PanelProps) => {
	return (
		<BaseTabs.Panel className={merge(styles.Panel, className)} {...props} />
	);
};

// Content alias for Panel (for convenience)
const Content = Panel;

// Indicator component
interface IndicatorProps
	extends React.ComponentProps<typeof BaseTabs.Indicator> {
	className?: string;
}

const Indicator = ({ className, ...props }: IndicatorProps) => {
	return (
		<BaseTabs.Indicator
			className={merge(styles.Indicator, className)}
			{...props}
		/>
	);
};

// Export all components
const Tabs = {
	Root,
	List,
	Tab,
	Trigger, // Alias for Tab
	Panel,
	Content, // Alias for Panel
	Indicator,
};

export default Tabs;
