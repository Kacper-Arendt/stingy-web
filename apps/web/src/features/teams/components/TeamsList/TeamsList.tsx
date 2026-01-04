import Skeleton from "@repo/ui/skeleton";
import TeamListItem from "@/features/teams/components/TeamsList/TeamListItem";
import { useTeams } from "@/features/teams/hooks/useTeams";
import styles from "./TeamsList.module.css";

const TeamsList = () => {
	const { data: teams, isLoading } = useTeams();

	if (isLoading) return <Skeleton width="100%" height="200px" />;

	if (teams?.length === 0) return null;

	return (
		<div className={styles.list}>
			{teams?.map((team) => (
				<TeamListItem key={team.id} team={team} />
			))}
		</div>
	);
};

export default TeamsList;
