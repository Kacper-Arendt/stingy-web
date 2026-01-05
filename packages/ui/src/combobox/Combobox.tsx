import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check, ChevronDown, X } from "lucide-react";
import type * as React from "react";
import merge from "../utils/merge";
import styles from "./combobox.module.css";

function CheckIcon() {
	return <Check size={14} />;
}

function ClearIcon() {
	return <X size={14} />;
}

function ChevronDownIcon() {
	return <ChevronDown size={14} />;
}

const Root = (props: React.ComponentProps<typeof BaseCombobox.Root>) => {
	return <BaseCombobox.Root {...props} />;
};

interface InputProps extends React.ComponentProps<typeof BaseCombobox.Input> {
	className?: string;
}

const Input = ({ className, ...props }: InputProps) => {
	return (
		<BaseCombobox.Input className={merge(styles.Input, className)} {...props} />
	);
};

interface ClearProps extends React.ComponentProps<typeof BaseCombobox.Clear> {
	className?: string;
}

const Clear = ({ className, children, ...props }: ClearProps) => {
	return (
		<BaseCombobox.Clear className={merge(styles.Clear, className)} {...props}>
			{children || <ClearIcon />}
		</BaseCombobox.Clear>
	);
};

interface TriggerProps
	extends React.ComponentProps<typeof BaseCombobox.Trigger> {
	className?: string;
}

const Trigger = ({ className, children, ...props }: TriggerProps) => {
	return (
		<BaseCombobox.Trigger
			className={merge(styles.Trigger, className)}
			{...props}
		>
			{children || <ChevronDownIcon />}
		</BaseCombobox.Trigger>
	);
};

const Portal = BaseCombobox.Portal;

interface PositionerProps
	extends React.ComponentProps<typeof BaseCombobox.Positioner> {
	className?: string;
}

const Positioner = ({ className, ...props }: PositionerProps) => {
	return (
		<BaseCombobox.Positioner
			className={merge(styles.Positioner, className)}
			{...props}
		/>
	);
};

interface PopupProps extends React.ComponentProps<typeof BaseCombobox.Popup> {
	className?: string;
}

const Popup = ({ className, ...props }: PopupProps) => {
	return (
		<BaseCombobox.Popup className={merge(styles.Popup, className)} {...props} />
	);
};

interface EmptyProps extends React.ComponentProps<typeof BaseCombobox.Empty> {
	className?: string;
}

const Empty = ({ className, ...props }: EmptyProps) => {
	return (
		<BaseCombobox.Empty className={merge(styles.Empty, className)} {...props} />
	);
};

interface ListProps extends React.ComponentProps<typeof BaseCombobox.List> {
	className?: string;
}

const List = ({ className, ...props }: ListProps) => {
	return (
		<BaseCombobox.List className={merge(styles.List, className)} {...props} />
	);
};

interface ItemProps extends React.ComponentProps<typeof BaseCombobox.Item> {
	className?: string;
}

const Item = ({ className, ...props }: ItemProps) => {
	return (
		<BaseCombobox.Item className={merge(styles.Item, className)} {...props} />
	);
};

interface ItemIndicatorProps
	extends React.ComponentProps<typeof BaseCombobox.ItemIndicator> {
	className?: string;
}

const ItemIndicator = ({
	className,
	children,
	...props
}: ItemIndicatorProps) => {
	return (
		<BaseCombobox.ItemIndicator
			className={merge(styles.ItemIndicator, className)}
			{...props}
		>
			{children || <CheckIcon />}
		</BaseCombobox.ItemIndicator>
	);
};

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const Label = ({ className, ...props }: LabelProps) => {
	return <div className={merge(styles.Label, className)} {...props} />;
};

interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const InputWrapper = ({ className, ...props }: InputWrapperProps) => {
	return <div className={merge(styles.InputWrapper, className)} {...props} />;
};

interface ActionButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const ActionButtons = ({ className, ...props }: ActionButtonsProps) => {
	return <div className={merge(styles.ActionButtons, className)} {...props} />;
};

interface ItemTextProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const ItemText = ({ className, ...props }: ItemTextProps) => {
	return <div className={merge(styles.ItemText, className)} {...props} />;
};

const Combobox = {
	Root,
	Input,
	Clear,
	Trigger,
	Portal,
	Positioner,
	Popup,
	Empty,
	List,
	Item,
	ItemIndicator,
	// Helper components
	Label,
	InputWrapper,
	ActionButtons,
	ItemText,
};

export default Combobox;
