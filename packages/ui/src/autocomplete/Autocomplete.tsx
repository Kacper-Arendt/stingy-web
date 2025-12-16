import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { ChevronDown, X } from "lucide-react";
import type * as React from "react";
import merge from "../utils/merge";
import styles from "./autocomplete.module.css";

function ClearIcon() {
	return <X size={14} />;
}

function ChevronDownIcon() {
	return <ChevronDown size={14} />;
}

const Root = (props: React.ComponentProps<typeof BaseAutocomplete.Root>) => {
	return <BaseAutocomplete.Root {...props} />;
};

// Input component
interface InputProps
	extends React.ComponentProps<typeof BaseAutocomplete.Input> {
	className?: string;
}

const Input = ({ className, ...props }: InputProps) => {
	return (
		<BaseAutocomplete.Input
			className={merge(styles.Input, className)}
			{...props}
		/>
	);
};

// Clear component
interface ClearProps
	extends React.ComponentProps<typeof BaseAutocomplete.Clear> {
	className?: string;
}

const Clear = ({ className, children, ...props }: ClearProps) => {
	return (
		<BaseAutocomplete.Clear
			className={merge(styles.Clear, className)}
			{...props}
		>
			{children || <ClearIcon />}
		</BaseAutocomplete.Clear>
	);
};

// Trigger component
interface TriggerProps
	extends React.ComponentProps<typeof BaseAutocomplete.Trigger> {
	className?: string;
}

const Trigger = ({ className, children, ...props }: TriggerProps) => {
	return (
		<BaseAutocomplete.Trigger
			className={merge(styles.Trigger, className)}
			{...props}
		>
			{children || <ChevronDownIcon />}
		</BaseAutocomplete.Trigger>
	);
};

// Portal component
const Portal = BaseAutocomplete.Portal;

// Positioner component
interface PositionerProps
	extends React.ComponentProps<typeof BaseAutocomplete.Positioner> {
	className?: string;
}

const Positioner = ({ className, ...props }: PositionerProps) => {
	return (
		<BaseAutocomplete.Positioner
			className={merge(styles.Positioner, className)}
			{...props}
		/>
	);
};

// Popup component
interface PopupProps
	extends React.ComponentProps<typeof BaseAutocomplete.Popup> {
	className?: string;
}

const Popup = ({ className, ...props }: PopupProps) => {
	return (
		<BaseAutocomplete.Popup
			className={merge(styles.Popup, className)}
			{...props}
		/>
	);
};

// Empty component
interface EmptyProps
	extends React.ComponentProps<typeof BaseAutocomplete.Empty> {
	className?: string;
}

const Empty = ({ className, ...props }: EmptyProps) => {
	return (
		<BaseAutocomplete.Empty
			className={merge(styles.Empty, className)}
			{...props}
		/>
	);
};

// List component
interface ListProps extends React.ComponentProps<typeof BaseAutocomplete.List> {
	className?: string;
}

const List = ({ className, ...props }: ListProps) => {
	return (
		<BaseAutocomplete.List
			className={merge(styles.List, className)}
			{...props}
		/>
	);
};

// Item component
interface ItemProps extends React.ComponentProps<typeof BaseAutocomplete.Item> {
	className?: string;
}

const Item = ({ className, ...props }: ItemProps) => {
	return (
		<BaseAutocomplete.Item
			className={merge(styles.Item, className)}
			{...props}
		/>
	);
};

// Label wrapper component (helper component)
interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const Label = ({ className, ...props }: LabelProps) => {
	return <div className={merge(styles.Label, className)} {...props} />;
};

// InputWrapper component (helper component)
interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const InputWrapper = ({ className, ...props }: InputWrapperProps) => {
	return <div className={merge(styles.InputWrapper, className)} {...props} />;
};

// ActionButtons component (helper component)
interface ActionButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const ActionButtons = ({ className, ...props }: ActionButtonsProps) => {
	return <div className={merge(styles.ActionButtons, className)} {...props} />;
};

// ItemText component (helper component)
interface ItemTextProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

const ItemText = ({ className, ...props }: ItemTextProps) => {
	return <div className={merge(styles.ItemText, className)} {...props} />;
};

// Export all components
const Autocomplete = {
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
	// Helper components
	Label,
	InputWrapper,
	ActionButtons,
	ItemText,
};

export default Autocomplete;
