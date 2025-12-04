import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { m } from "@/paraglide/messages";
import { useState } from "react";
import { useSetTourStatus, useTourStatuses } from "../hooks/useOnboarding";
import { OnboardingRouteKey, TourStatus } from "../types/onboarding";

interface GuidesManagementModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

interface GuideInfo {
	key: OnboardingRouteKey;
	name: typeof m.onboarding_teams_list_title;
	description: typeof m.onboarding_guides_teams_list_description;
}

const ALL_GUIDES: GuideInfo[] = [
	{
		key: OnboardingRouteKey.TEAMS_LIST,
		name: m.onboarding_teams_list_title,
		description: m.onboarding_guides_teams_list_description,
	},
	{
		key: OnboardingRouteKey.TEAM_DETAIL,
		name: m.onboarding_team_detail_title,
		description: m.onboarding_guides_team_detail_description,
	},
	{
		key: OnboardingRouteKey.RETROSPECTIVE,
		name: m.onboarding_retro_title,
		description: m.onboarding_guides_retro_description,
	},
];

export function GuidesManagementModal({
	open,
	onOpenChange,
}: GuidesManagementModalProps) {
	const [selectedGuides, setSelectedGuides] = useState<Set<OnboardingRouteKey>>(
		new Set(),
	);
	const { data: tourStatuses, isLoading } = useTourStatuses();
	const setTourStatusMutation = useSetTourStatus();

	const handleToggle = (guideKey: OnboardingRouteKey) => {
		setSelectedGuides((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(guideKey)) {
				newSet.delete(guideKey);
			} else {
				newSet.add(guideKey);
			}
			return newSet;
		});
	};

	const handleRestart = async () => {
		// Reset selected guides by setting their status to TODO
		const promises = Array.from(selectedGuides).map((guideKey) =>
			setTourStatusMutation.mutateAsync({
				tourKey: guideKey,
				status: TourStatus.TODO,
			}),
		);

		await Promise.all(promises);

		// Close modal and reset selection
		setSelectedGuides(new Set());
		onOpenChange(false);
	};

	const getGuideStatus = (guideKey: OnboardingRouteKey) => {
		const tour = tourStatuses?.find((t) => t.tourKey === guideKey);
		if (!tour) return m.onboarding_guides_status_not_viewed();

		switch (tour.status) {
			case TourStatus.DONE:
				return m.onboarding_guides_status_completed();
			case TourStatus.CLOSED:
				return m.onboarding_guides_status_dismissed();
			case TourStatus.TODO:
				return m.onboarding_guides_status_pending();
			default:
				return m.onboarding_guides_status_not_viewed();
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>{m.onboarding_guides_title()}</DialogTitle>
					<DialogDescription>
						{m.onboarding_guides_description()}
					</DialogDescription>
				</DialogHeader>

				{isLoading ? (
					<div className="space-y-4">
						{[1, 2, 3].map((i) => (
							<Skeleton key={i} className="h-16 w-full" />
						))}
					</div>
				) : (
					<div className="space-y-4">
						{ALL_GUIDES.map((guide) => {
							const status = getGuideStatus(guide.key);
							const isSelected = selectedGuides.has(guide.key);

							return (
								<div
									key={guide.key}
									className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
								>
									<Checkbox
										id={guide.key}
										checked={isSelected}
										onCheckedChange={() => handleToggle(guide.key)}
									/>
									<div className="flex-1 space-y-1">
										<label
											htmlFor={guide.key}
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
										>
											{guide.name()}
										</label>
										<p className="text-sm text-muted-foreground">
											{guide.description()}
										</p>
										<p className="text-xs text-muted-foreground">
											{m.onboarding_guides_status()}: {status}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				)}

				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						{m.onboarding_guides_cancel()}
					</Button>
					<Button
						onClick={handleRestart}
						disabled={
							selectedGuides.size === 0 || setTourStatusMutation.isPending
						}
					>
						{setTourStatusMutation.isPending
							? m.onboarding_guides_restarting()
							: m.onboarding_guides_restart()}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
