import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import * as m from "@/paraglide/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	type AddParticipantRequest,
	addTeamParticipant,
} from "../api/addTeamParticipant";

export function useAddTeamParticipant(teamId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (request: AddParticipantRequest) =>
			addTeamParticipant(teamId, request),
		onSuccess: () => {
			// Invalidate team participants
			queryClient.invalidateQueries({
				queryKey: queryKeys.teams.participants(teamId),
			});

			// Invalidate team details to refresh member count
			queryClient.invalidateQueries({
				queryKey: queryKeys.teams.detail(teamId),
			});

			toast.success(m.teams_invitation_sent_success());
		},
		onError: (error) => {
			const errorMessage =
				error instanceof Error
					? error.message
					: m.teams_invitation_sent_error();
			toast.error(errorMessage);
		},
	});
}
