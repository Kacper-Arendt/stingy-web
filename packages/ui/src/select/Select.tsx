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

interface TriggerProps extends React.ComponentProps<typeof BaseSelect.Trigger> {
	className?: string;
}

const Trigger = ({ className, children, ...props }: TriggerProps) => {
	return (
		<BaseSelect.Trigger className={merge(styles.Trigger, className)} {...props}>
			{children}
		</BaseSelect.Trigger>
	);
};

interface IconProps extends React.ComponentProps<typeof BaseSelect.Icon> {
	className?: string;
}

const Icon = ({ className, ...props }: IconProps) => {
	return (
		<BaseSelect.Icon className={merge(styles.Icon, className)} {...props}>
			<ChevronDownIcon />
		</BaseSelect.Icon>
	);
};

const Portal = BaseSelect.Portal;

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

interface PopupProps extends React.ComponentProps<typeof BaseSelect.Popup> {
	className?: string;
}

const Popup = ({ className, ...props }: PopupProps) => {
	return (
		<BaseSelect.Popup className={merge(styles.Popup, className)} {...props} />
	);
};

interface ListProps extends React.ComponentProps<typeof BaseSelect.List> {
	className?: string;
}

const List = ({ className, ...props }: ListProps) => {
	return (
		<BaseSelect.List className={merge(styles.List, className)} {...props} />
	);
};

interface ItemProps extends React.ComponentProps<typeof BaseSelect.Item> {
	className?: string;
}

const Item = ({ className, ...props }: ItemProps) => {
	return (
		<BaseSelect.Item className={merge(styles.Item, className)} {...props} />
	);
};

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

interface ValueProps extends React.ComponentProps<typeof BaseSelect.Value> {
	className?: string;
}

const Value = ({ className, ...props }: ValueProps) => {
	return (
		<BaseSelect.Value className={merge(styles.Value, className)} {...props} />
	);
};

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const Label = ({ className, ...props }: LabelProps) => {
	return <div className={merge(styles.Label, className)} {...props} />;
};

interface ItemTextProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const ItemText = ({ className, ...props }: ItemTextProps) => {
	return <div className={merge(styles.Value, className)} {...props} />;
};

const Select = {
	Root,
	Trigger,
	Icon,
	Portal,
	Positioner,
	Popup,
	List,
	Item,
	ItemIndicator,
	Value,
	Label,
	ItemText,
};

export default Select;
