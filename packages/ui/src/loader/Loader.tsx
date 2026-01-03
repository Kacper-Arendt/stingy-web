import type * as React from "react";
import merge from "../utils/merge";
import styles from "./loader.module.css";

interface ILoader extends React.HTMLAttributes<HTMLDivElement> {
	size?: "small" | "medium" | "large";
	variant?: "primary" | "secondary";
}

const Loader = ({
	size = "medium",
	variant = "primary",
	className,
	...props
}: ILoader) => {
	const sizeClass = {
		small: styles.LoaderSm,
		medium: styles.LoaderMd,
		large: styles.LoaderLg,
	}[size];

	const variantClass = {
		primary: styles.LoaderPrimary,
		secondary: styles.LoaderSecondary,
	}[variant];

	const loaderClasses = merge(
		styles.Loader,
		sizeClass,
		variantClass,
		className,
	);

	return (
		<div className={loaderClasses} {...props}>
			<div className={styles.LoaderSpinner} />
		</div>
	);
};

export default Loader;
