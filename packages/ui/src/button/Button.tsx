import { Button as BaseButton } from "@base-ui/react/button";
import type React from "react"; // Dodaj import React
import merge from "../utils/merge";
import styles from "./button.module.css";

interface IButton extends React.ComponentProps<"button"> {
	variant?: "primary" | "secondary" | "danger" | "outline" | "ghost" | "link";
	size?: "small" | "medium" | "large";
	render?: React.ReactNode;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

const Button = ({
	variant = "primary",
	size = "medium",
	className,
	render,
	leftIcon,
	rightIcon,
	children,
	...props
}: IButton) => {
	const variantClass = {
		primary: styles.ButtonPrimary,
		secondary: styles.ButtonSecondary,
		danger: styles.ButtonDanger,
		outline: styles.ButtonOutline,
		ghost: styles.ButtonGhost,
		link: styles.ButtonLink,
	}[variant];

	const sizeClass = {
		small: styles.ButtonSm,
		medium: styles.ButtonMd,
		large: styles.ButtonLg,
	}[size];

	const buttonClasses = merge(
		styles.Button,
		variantClass,
		sizeClass,
		className,
	);

	return (
		<BaseButton className={buttonClasses} {...props}>
			{leftIcon && <span className={styles.ButtonLeftIcon}>{leftIcon}</span>}
			{children}
			{rightIcon && <span className={styles.ButtonRightIcon}>{rightIcon}</span>}
		</BaseButton>
	);
};

export default Button;
