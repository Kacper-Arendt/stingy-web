import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type * as React from "react";
import merge from "../utils/merge";
import styles from "./navigation-menu.module.css";

// Root component
interface RootProps
	extends React.ComponentProps<typeof BaseNavigationMenu.Root> {
	className?: string;
}

const Root = ({ className, ...props }: RootProps) => {
	return (
		<BaseNavigationMenu.Root
			className={merge(styles.Root, className)}
			{...props}
		/>
	);
};

// List component
interface ListProps
	extends React.ComponentProps<typeof BaseNavigationMenu.List> {
	className?: string;
}

const List = ({ className, ...props }: ListProps) => {
	return (
		<BaseNavigationMenu.List
			className={merge(styles.List, className)}
			{...props}
		/>
	);
};

// Item component
interface ItemProps
	extends React.ComponentProps<typeof BaseNavigationMenu.Item> {
	className?: string;
}

const Item = ({ className, ...props }: ItemProps) => {
	return (
		<BaseNavigationMenu.Item
			className={merge(styles.Item, className)}
			{...props}
		/>
	);
};

// Trigger component
interface TriggerProps
	extends React.ComponentProps<typeof BaseNavigationMenu.Trigger> {
	className?: string;
}

const Trigger = ({ className, ...props }: TriggerProps) => {
	return (
		<BaseNavigationMenu.Trigger
			className={merge(styles.Trigger, className)}
			{...props}
		/>
	);
};

// Content component
interface ContentProps
	extends React.ComponentProps<typeof BaseNavigationMenu.Content> {
	className?: string;
}

const Content = ({ className, ...props }: ContentProps) => {
	return (
		<BaseNavigationMenu.Content
			className={merge(styles.Content, className)}
			{...props}
		/>
	);
};

// Link component
interface LinkProps
	extends React.ComponentProps<typeof BaseNavigationMenu.Link> {
	className?: string;
}

const Link = ({ className, ...props }: LinkProps) => {
	return (
		<BaseNavigationMenu.Link
			className={merge(styles.Link, className)}
			{...props}
		/>
	);
};

// Viewport component
interface ViewportProps
	extends React.ComponentProps<typeof BaseNavigationMenu.Viewport> {
	className?: string;
}

const Viewport = ({ className, ...props }: ViewportProps) => {
	return (
		<BaseNavigationMenu.Viewport
			className={merge(styles.Viewport, className)}
			{...props}
		/>
	);
};

// Portal component
const Portal = BaseNavigationMenu.Portal;

// Export all components
const NavigationMenu = {
	Root,
	List,
	Item,
	Trigger,
	Content,
	Link,
	Viewport,
	Portal,
};

export default NavigationMenu;
