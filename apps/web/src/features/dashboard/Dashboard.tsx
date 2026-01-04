import { RouteWrapper } from "@/components/ui/routeWrapper/RouteWrapper";
import { useT } from "@/locales/useT";

const Dashboard = () => {
	const { t } = useT();

	return (
		<RouteWrapper>
			<RouteWrapper.Header title={t("dashboard_title")} />
			<RouteWrapper.Content>
				<div>Dashboard</div>
			</RouteWrapper.Content>
		</RouteWrapper>
	);
};

export default Dashboard;
