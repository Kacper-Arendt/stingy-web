import styles from "./routeHeader.module.css";

const RouteHeader = ({
	title,
	actions,
}: {
	title: string;
	actions?: React.ReactNode;
}) => (
	<div className={styles.RouteHeader}>
		<h1 className={styles.RouteHeaderTitle}>{title}</h1>
		<div className={styles.RouteHeaderActions}>{actions}</div>
	</div>
);

export default RouteHeader;
