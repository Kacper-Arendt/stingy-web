import type * as React from "react";
import merge from "../utils/merge";
import styles from "./skeleton.module.css";

interface ISkeleton extends React.HTMLAttributes<HTMLDivElement> {
	width?: string | number;
	height?: string | number;
}

const Skeleton = ({ width, height, className, style, ...props }: ISkeleton) => {
	const skeletonClasses = merge(styles.Skeleton, className);

	const skeletonStyle: React.CSSProperties = {
		width: width ?? undefined,
		height: height ?? undefined,
		...style,
	};

	return <div className={skeletonClasses} style={skeletonStyle} {...props} />;
};

export default Skeleton;
