import { teamKeys } from "@/integrations/tanstack-query/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addTeamMember } from "../api/teams.api";

export function useInviteTeamMembers(teamId: string) {
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
		onSuccess: (_, emails) => {
			// Invalidate team details to refetch members
			queryClient.invalidateQueries({
				queryKey: teamKeys.detail(teamId),
			});

			// Invalidate teams list as member count might change
			queryClient.invalidateQueries({
				queryKey: teamKeys.lists(),
			});

			toast.success(`Invitations sent to ${emails.length} email(s)`);
		},
		onError: () => {
			toast.error("Failed to send invitations");
		},
	});
}
