import type React from "react";
import merge from "../utils/merge";
import styles from "./badge.module.css";

interface IBadge extends React.HTMLAttributes<HTMLSpanElement> {
	variant?: "default" | "secondary" | "outline" | "gold";
	children: React.ReactNode;
}

const Badge = ({
	variant = "default",
	className,
	children,
	...props
}: IBadge) => {
	const variantClass =
		variant === "outline"
			? styles.BadgeOutline
			: variant === "gold"
				? styles.BadgeGold
				: undefined;

	const badgeClasses = merge(styles.Badge, variantClass, className);

	return (
		<span className={badgeClasses} {...props}>
			{children}
		</span>
	);
};

export default Badge;
