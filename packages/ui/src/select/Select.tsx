import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import type * as React from "react";
import merge from "../utils/merge";
import styles from "./select.module.css";

function CheckIcon() {
	return <Check size={14} />;
}

function ChevronDownIcon() {
	return <ChevronDown size={14} />;
}

const Root = (props: React.ComponentProps<typeof BaseSelect.Root>) => {
	return <BaseSelect.Root {...props} />;
};

// Trigger component
interface TriggerProps extends React.ComponentProps<typeof BaseSelect.Trigger> {
	className?: string;
}

const Trigger = ({ className, children, ...props }: TriggerProps) => {
	return (
		<BaseSelect.Trigger className={merge(styles.Trigger, className)} {...props}>
			{children}
			<span className={styles.Icon}>
				<ChevronDownIcon />
			</span>
		</BaseSelect.Trigger>
	);
};

// Portal component
const Portal = BaseSelect.Portal;

// Positioner component
interface PositionerProps
	extends React.ComponentProps<typeof BaseSelect.Positioner> {
	className?: string;
}

const Positioner = ({ className, ...props }: PositionerProps) => {
	return (
		<BaseSelect.Positioner
			className={merge(styles.Positioner, className)}
			{...props}
		/>
	);
};

// Popup component
interface PopupProps extends React.ComponentProps<typeof BaseSelect.Popup> {
	className?: string;
}

const Popup = ({ className, ...props }: PopupProps) => {
	return (
		<BaseSelect.Popup className={merge(styles.Popup, className)} {...props} />
	);
};

// List component
interface ListProps extends React.ComponentProps<typeof BaseSelect.List> {
	className?: string;
}

const List = ({ className, ...props }: ListProps) => {
	return (
		<BaseSelect.List className={merge(styles.List, className)} {...props} />
	);
};

// Item component
interface ItemProps extends React.ComponentProps<typeof BaseSelect.Item> {
	className?: string;
}

const Item = ({ className, ...props }: ItemProps) => {
	return (
		<BaseSelect.Item className={merge(styles.Item, className)} {...props} />
	);
};

// ItemIndicator component
interface ItemIndicatorProps
	extends React.ComponentProps<typeof BaseSelect.ItemIndicator> {
	className?: string;
}

const ItemIndicator = ({
	className,
	children,
	...props
}: ItemIndicatorProps) => {
	return (
		<BaseSelect.ItemIndicator
			className={merge(styles.ItemIndicator, className)}
			{...props}
		>
			{children || <CheckIcon />}
		</BaseSelect.ItemIndicator>
	);
};

// Value component
interface ValueProps extends React.ComponentProps<typeof BaseSelect.Value> {
	className?: string;
}

const Value = ({ className, ...props }: ValueProps) => {
	return (
		<BaseSelect.Value className={merge(styles.Value, className)} {...props} />
	);
};

// ValueText alias for Value (for convenience)
const ValueText = Value;

// Label wrapper component (helper component)
interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const Label = ({ className, ...props }: LabelProps) => {
	return <div className={merge(styles.Label, className)} {...props} />;
};

// Export all components
const Select = {
	Root,
	Trigger,
	Portal,
	Positioner,
	Popup,
	List,
	Item,
	ItemIndicator,
	Value,
	ValueText, // Alias for Value
	// Helper components
	Label,
};

export default Select;
