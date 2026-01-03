import type { Team } from "../types/team";

const TeamListItem = ({ team }: { team: Team }) => {
	return (
		<div>
			<p>{team.name}</p>
			<p>{team.description}</p>
			<p>{team.createdAt}</p>
			<p>{team.userRole}</p>
			<p>{team.memberCount}</p>
		</div>
	);
};

export default TeamListItem;
