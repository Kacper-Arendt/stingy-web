import api from "@/utils/api";
import type {
	SetTourStatusRequest,
	SetTourStatusResponse,
	TourStatusItem,
} from "../types/onboarding";
import { TourStatus } from "../types/onboarding";

export const getAllTourStatuses = async (): Promise<TourStatusItem[]> => {
	return api<TourStatusItem[]>("api/profiles/me/tours", {
		method: "GET",
	});
};

export const setTourStatus = async (
	tourKey: string,
	status: TourStatus = TourStatus.DONE,
): Promise<SetTourStatusResponse> => {
	return api<SetTourStatusResponse>("api/profiles/me/tours", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ tourKey, status } as SetTourStatusRequest),
	});
};
