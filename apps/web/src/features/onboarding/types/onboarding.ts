export const OnboardingRouteKey = {
	TEAMS_LIST: "teams-list",
	TEAM_DETAIL: "team-detail",
	TEAM_SETTINGS: "team-settings",
	TEAM_SUMMARIES: "team-summaries",
	RETROSPECTIVE: "retrospective",
} as const;

export type OnboardingRouteKey =
	(typeof OnboardingRouteKey)[keyof typeof OnboardingRouteKey];

export const TourStatus = {
	DONE: 0,
	CLOSED: 1,
	TODO: 2,
} as const;

export type TourStatus = (typeof TourStatus)[keyof typeof TourStatus];

export interface TourStatusItem {
	tourKey: string;
	status: TourStatus;
}

export interface SetTourStatusRequest {
	tourKey: string;
	status: TourStatus;
}

export interface SetTourStatusResponse {
	message: string;
}
