import { useEffect, useState } from "react";
import { OnboardingRouteKey, TourStatus } from "../types/onboarding";
import { useSetTourStatus, useTourStatuses } from "./useOnboarding";

export function useOnboardingModal(routeKey: OnboardingRouteKey) {
	const [isOpen, setIsOpen] = useState(false);

	const { data: tourStatuses, isLoading } = useTourStatuses();
	const setTourStatusMutation = useSetTourStatus();

	// Find the tour status for this route
	const tourStatus = tourStatuses?.find((tour) => tour.tourKey === routeKey);

	// Show modal if: no status exists OR status is TODO
	const shouldShow =
		!isLoading && (!tourStatus || tourStatus.status === TourStatus.TODO);

	// Auto-show when shouldShow is true
	useEffect(() => {
		if (shouldShow) {
			setIsOpen(true);
		}
	}, [shouldShow]);

	const handleDone = () => {
		setIsOpen(false);
		setTourStatusMutation.mutate({
			tourKey: routeKey,
			status: TourStatus.DONE,
		});
	};

	const handleClosed = () => {
		setIsOpen(false);
		setTourStatusMutation.mutate({
			tourKey: routeKey,
			status: TourStatus.CLOSED,
		});
	};

	const handleTodo = () => {
		setIsOpen(false);
		setTourStatusMutation.mutate({
			tourKey: routeKey,
			status: TourStatus.TODO,
		});
	};

	return {
		isOpen,
		handleDone,
		handleClosed,
		handleTodo,
	};
}
