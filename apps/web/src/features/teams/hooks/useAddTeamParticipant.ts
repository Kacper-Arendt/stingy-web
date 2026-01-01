import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import {
	type AddParticipantRequest,
	addTeamParticipant,
} from "../api/teamParticipants.api";

export function useAddTeamParticipant({
	teamId,
	onSuccess,
	onError,
}: {
	teamId: string;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (request: AddParticipantRequest) =>
			addTeamParticipant(teamId, request),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.teams.participants(teamId),
			});

			queryClient.invalidateQueries({
				queryKey: queryKeys.teams.detail(teamId),
			});

			onSuccess?.();
		},
		onError: (error) => onError?.(error),
	});
}
