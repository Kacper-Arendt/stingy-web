import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTourStatuses, setTourStatus } from "../api/onboarding.api";
import { TourStatus } from "../types/onboarding";

export const useTourStatuses = () => {
	return useQuery({
		queryKey: queryKeys.onboarding.statuses(),
		queryFn: getAllTourStatuses,
		staleTime: 1000 * 60 * 5, // 5 minutes
		retry: false,
	});
};

export const useSetTourStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			tourKey,
			status = TourStatus.DONE,
		}: { tourKey: string; status?: TourStatus }) =>
			setTourStatus(tourKey, status),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeys.onboarding.statuses(),
			});
		},
	});
};
