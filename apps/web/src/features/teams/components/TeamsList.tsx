import Skeleton from "@repo/ui/skeleton";
import { useTeams } from "../hooks/useTeams";
import TeamListItem from "./TeamListItem";

const TeamsList = () => {
	const { data: teams, isLoading } = useTeams();

	if (isLoading) return <Skeleton width="100%" height="100px" />;

	if (teams?.length === 0) return null;

	return (
		<div>
			{teams?.map((team) => (
				<TeamListItem key={team.id} team={team} />
			))}
		</div>
	);
};

export default TeamsList;
