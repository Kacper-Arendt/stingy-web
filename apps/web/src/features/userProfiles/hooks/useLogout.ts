import * as m from "@/paraglide/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { logout } from "../api/logout.api";

/**
 * Hook to handle user logout
 */
export const useLogout = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			// Clear all cached data
			queryClient.clear();

			// Navigate to login page
			navigate({ to: "/auth", replace: true });

			// Show success message
			toast.success(m.profile_logout_success());
		},
		onError: () => {
			// Show error message
			toast.error(m.profile_logout_error());
		},
	});
};
