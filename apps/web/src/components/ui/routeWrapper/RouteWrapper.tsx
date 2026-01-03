import styles from "./routeWrapper.module.css";

const RouteWrapperRoot = ({ children }: { children: React.ReactNode }) => {
	return <div className={styles.Container}>{children}</div>;
};

const RouteWrapperContent = ({ children }: { children: React.ReactNode }) => {
	return <div className={styles.Content}>{children}</div>;
};

const RouteWrapperHeader = ({
	title,
	description,
	actions,
}: {
	title: string;
	description?: string;
	actions?: React.ReactNode;
}) => {
	return (
		<div className={styles.Header}>
			<div className={styles.HeaderTitle}>
				<h1 className={styles.RouteHeaderTitle}>{title}</h1>
				{description && (
					<p className={styles.RouteHeaderDescription}>{description}</p>
				)}
			</div>
			{actions && <div className={styles.RouteHeaderActions}>{actions}</div>}
		</div>
	);
};

const RouteWrapper = Object.assign(RouteWrapperRoot, {
	Header: RouteWrapperHeader,
	Content: RouteWrapperContent,
});

export { RouteWrapper, RouteWrapperContent, RouteWrapperHeader };
