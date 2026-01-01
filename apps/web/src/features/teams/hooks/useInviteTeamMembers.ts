import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import { addTeamMember } from "../api/teams";

export function useInviteTeamMembers({
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
		mutationFn: async (emails: string[]) => {
			// For each email, create an invitation
			const invitePromises = emails.map((email) =>
				addTeamMember(teamId, {
					email,
					role: 3, // Default to member role (API expects number)
				}),
			);

			return Promise.all(invitePromises);
		},
		onSuccess: () => {
			// Invalidate team details to refetch members
			queryClient.invalidateQueries({
				queryKey: teamKeys.detail(teamId),
			});

			// Invalidate teams list as member count might change
			queryClient.invalidateQueries({
				queryKey: teamKeys.lists(),
			});

			onSuccess?.();
		},
		onError: (error) => onError?.(error),
	});
}
