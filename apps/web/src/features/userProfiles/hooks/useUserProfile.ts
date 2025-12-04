import { queryKeys } from "@/integrations/tanstack-query/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createMyProfile,
	getMyDefaultAvatar,
	getMyProfile,
	getMyProfileStats,
	getPublicProfile,
	getUserDefaultAvatar,
	updateMyProfile,
} from "../api/userProfile.api";

export const useMyProfile = () => {
	return useQuery({
		queryKey: queryKeys.profiles.my(),
		queryFn: getMyProfile,
		staleTime: 1000 * 60 * 5, // 5 minutes
		retry: false,
	});
};

export const useMyProfileStats = () => {
	return useQuery({
		queryKey: queryKeys.profiles.myStats(),
		queryFn: getMyProfileStats,
		staleTime: 1000 * 60 * 2, // 2 minutes
		retry: false,
	});
};

export const useMyDefaultAvatar = () => {
	return useQuery({
		queryKey: queryKeys.profiles.myDefaultAvatar(),
		queryFn: getMyDefaultAvatar,
		staleTime: 1000 * 60 * 10, // 10 minutes
	});
};

export const usePublicProfile = (userId: string) => {
	return useQuery({
		queryKey: queryKeys.profiles.public(userId),
		queryFn: () => getPublicProfile(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

export const useUserDefaultAvatar = (userId: string) => {
	return useQuery({
		queryKey: queryKeys.profiles.userDefaultAvatar(userId),
		queryFn: () => getUserDefaultAvatar(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 10, // 10 minutes
	});
};

export const useCreateMyProfile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createMyProfile,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.profiles.my() });
			queryClient.invalidateQueries({ queryKey: queryKeys.profiles.myStats() });
			queryClient.invalidateQueries({
				queryKey: queryKeys.profiles.myDefaultAvatar(),
			});
		},
	});
};

export const useUpdateMyProfile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateMyProfile,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.profiles.my() });
			queryClient.invalidateQueries({ queryKey: queryKeys.profiles.myStats() });
			queryClient.invalidateQueries({
				queryKey: queryKeys.profiles.myDefaultAvatar(),
			});
		},
	});
};
