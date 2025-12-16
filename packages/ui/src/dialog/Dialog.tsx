import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type * as React from "react";
import merge from "../utils/merge";
import styles from "./dialog.module.css";

function CloseIcon() {
	return <X size={16} />;
}

// Root component
interface RootProps extends React.ComponentProps<typeof BaseDialog.Root> {
	className?: string;
}

const Root = ({ className, ...props }: RootProps) => {
	return <BaseDialog.Root {...props} />;
};

// Trigger component
interface TriggerProps extends React.ComponentProps<typeof BaseDialog.Trigger> {
	className?: string;
}

const Trigger = ({ className, ...props }: TriggerProps) => {
	return (
		<BaseDialog.Trigger
			className={merge(styles.Trigger, className)}
			{...props}
		/>
	);
};

// Portal component
const Portal = BaseDialog.Portal;

// Backdrop component
interface BackdropProps
	extends React.ComponentProps<typeof BaseDialog.Backdrop> {
	className?: string;
}

const Backdrop = ({ className, ...props }: BackdropProps) => {
	return (
		<BaseDialog.Backdrop
			className={merge(styles.Backdrop, className)}
			{...props}
		/>
	);
};

// Popup component (Content)
interface PopupProps extends React.ComponentProps<typeof BaseDialog.Popup> {
	className?: string;
}

const Popup = ({ className, ...props }: PopupProps) => {
	return (
		<BaseDialog.Popup className={merge(styles.Popup, className)} {...props} />
	);
};

// Viewport component
interface ViewportProps
	extends React.ComponentProps<typeof BaseDialog.Viewport> {
	className?: string;
}

const Viewport = ({ className, ...props }: ViewportProps) => {
	return (
		<BaseDialog.Viewport
			className={merge(styles.Viewport, className)}
			{...props}
		/>
	);
};

// Close component
interface CloseProps extends React.ComponentProps<typeof BaseDialog.Close> {
	className?: string;
}

const Close = ({ className, children, ...props }: CloseProps) => {
	return (
		<BaseDialog.Close className={merge(styles.Close, className)} {...props}>
			{children || <CloseIcon />}
		</BaseDialog.Close>
	);
};

// Title component
interface TitleProps extends React.ComponentProps<typeof BaseDialog.Title> {
	className?: string;
}

const Title = ({ className, ...props }: TitleProps) => {
	return (
		<BaseDialog.Title className={merge(styles.Title, className)} {...props} />
	);
};

// Description component
interface DescriptionProps
	extends React.ComponentProps<typeof BaseDialog.Description> {
	className?: string;
}

const Description = ({ className, ...props }: DescriptionProps) => {
	return (
		<BaseDialog.Description
			className={merge(styles.Description, className)}
			{...props}
		/>
	);
};

// Export all components
const Dialog = {
	Root,
	Trigger,
	Portal,
	Backdrop,
	Popup,
	Viewport,
	Close,
	Title,
	Description,
};

export default Dialog;
