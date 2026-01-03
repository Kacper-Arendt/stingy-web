import RouteHeader from "@/components/ui/routeHeader/RouteHeader";
import RouteWrapper from "@/components/ui/routeWrapper/RouteWrapper";
import { useT } from "@/locales/useT";
import { CreateTeamDialog } from "./components/CreateTeamDialog/CreateTeamDialog";
import TeamsList from "./components/TeamsList";

const Teams = () => {
	const { t } = useT();

	return (
		<RouteWrapper>
			<RouteHeader title={t("teams_title")} actions={<CreateTeamDialog />} />
			<TeamsList />
		</RouteWrapper>
	);
};

export default Teams;
