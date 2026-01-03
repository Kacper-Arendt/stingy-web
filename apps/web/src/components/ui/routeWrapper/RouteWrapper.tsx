import styles from "./routeWrapper.module.css";

const RouteWrapper = ({ children }: { children: React.ReactNode }) => {
	return <div className={styles.Container}>{children}</div>;
};

export default RouteWrapper;
