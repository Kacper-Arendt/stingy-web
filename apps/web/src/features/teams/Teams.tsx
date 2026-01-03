import { RouteWrapper } from "@/components/ui/routeWrapper/RouteWrapper";
import { useT } from "@/locales/useT";
import { CreateTeamDialog } from "./components/CreateTeamDialog/CreateTeamDialog";
import TeamsList from "./components/TeamsList";

const Teams = () => {
	const { t } = useT();

	return (
		<RouteWrapper>
			<RouteWrapper.Header
				title={t("teams_title")}
				actions={<CreateTeamDialog />}
			/>
			<RouteWrapper.Content>
				<TeamsList />
			</RouteWrapper.Content>
		</RouteWrapper>
	);
};

export default Teams;
