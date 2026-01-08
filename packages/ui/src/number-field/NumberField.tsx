import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { ChevronDown, ChevronUp } from "lucide-react";
import type * as React from "react";
import merge from "../utils/merge";
import styles from "./number-field.module.css";

function IncrementIcon() {
	return <ChevronUp size={14} />;
}

function DecrementIcon() {
	return <ChevronDown size={14} />;
}

// Root component
interface RootProps extends React.ComponentProps<typeof BaseNumberField.Root> {
	className?: string;
}

const Root = ({ className, ...props }: RootProps) => {
	return (
		<BaseNumberField.Root
			className={merge(styles.Root, className)}
			{...props}
		/>
	);
};

// Input component
interface InputProps
	extends React.ComponentProps<typeof BaseNumberField.Input> {
	className?: string;
}

const Input = ({ className, ...props }: InputProps) => {
	return (
		<BaseNumberField.Input
			className={merge(styles.Input, className)}
			{...props}
		/>
	);
};

// Increment component
interface IncrementProps
	extends React.ComponentProps<typeof BaseNumberField.Increment> {
	className?: string;
}

const Increment = ({ className, children, ...props }: IncrementProps) => {
	return (
		<BaseNumberField.Increment
			className={merge(styles.Increment, className)}
			{...props}
		>
			{children || <IncrementIcon />}
		</BaseNumberField.Increment>
	);
};

// Decrement component
interface DecrementProps
	extends React.ComponentProps<typeof BaseNumberField.Decrement> {
	className?: string;
}

const Decrement = ({ className, children, ...props }: DecrementProps) => {
	return (
		<BaseNumberField.Decrement
			className={merge(styles.Decrement, className)}
			{...props}
		>
			{children || <DecrementIcon />}
		</BaseNumberField.Decrement>
	);
};

// ScrubArea component
interface ScrubAreaProps
	extends React.ComponentProps<typeof BaseNumberField.ScrubArea> {
	className?: string;
}

const ScrubArea = ({ className, ...props }: ScrubAreaProps) => {
	return (
		<BaseNumberField.ScrubArea
			className={merge(styles.ScrubArea, className)}
			{...props}
		/>
	);
};

interface GroupProps
	extends React.ComponentProps<typeof BaseNumberField.Group> {
	className?: string;
}

const Group = ({ className, ...props }: GroupProps) => {
	return (
		<BaseNumberField.Group
			className={merge(styles.Group, className)}
			{...props}
		/>
	);
};

const NumberField = {
	Root,
	Input,
	Increment,
	Decrement,
	ScrubArea,
	Group,
};

export default NumberField;
