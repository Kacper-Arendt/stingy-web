// Helper/factory for react-query keys

export const teamKeys = {
	all: () => ["teams"] as const,
	lists: () => [...teamKeys.all(), "list"] as const,
	list: (filters?: Record<string, unknown>) =>
		[...teamKeys.lists(), { filters }] as const,
	details: () => [...teamKeys.all(), "detail"] as const,
	detail: (teamId: string) => [...teamKeys.details(), teamId] as const,
	members: (teamId: string) => [...teamKeys.detail(teamId), "members"] as const,
	participants: (teamId: string) =>
		[...teamKeys.detail(teamId), "participants"] as const,
	stats: (teamId: string) => [...teamKeys.detail(teamId), "stats"] as const,
	retros: (teamId: string) => [...teamKeys.detail(teamId), "retros"] as const,
	permissions: (teamId: string) =>
		[...teamKeys.detail(teamId), "permissions"] as const,
	recentRetros: (teamId: string, limit?: number) =>
		[...teamKeys.detail(teamId), "recent-retros", { limit }] as const,
	summaries: (teamId: string) =>
		[...teamKeys.detail(teamId), "summaries"] as const,
};

export const retroKeys = {
	allRetros: ["retros"],
	all: ["retro"],
	detail: (retroId: string) => ["retro", retroId],
	invitations: (retroId: string) => ["retro-invitations", retroId],
	userInvitations: () => ["user-invitations"],
	notes: (retroId: string) => ["retro-notes", retroId],
	participants: (retroId: string) => ["retro-participants", retroId],
	stats: (retroId: string) => ["retro-stats", retroId],
	statistics: (retroId: string) => ["retro-statistics", retroId],
	permissions: (retroId: string) => ["retro-permissions", retroId],
	summary: (retroId: string) => ["retro-summary", retroId],
	slideshowColumns: (retroId: string) => ["slideshow-columns", retroId],
	slideshowNotes: (retroId: string, columnId: string) => [
		"slideshow-notes",
		retroId,
		columnId,
	],
};

export const profileKeys = {
	all: () => ["profiles"] as const,
	my: () => [...profileKeys.all(), "my"] as const,
	myStats: () => [...profileKeys.my(), "stats"] as const,
	myDefaultAvatar: () => [...profileKeys.my(), "default-avatar"] as const,
	public: (userId: string) => [...profileKeys.all(), "public", userId] as const,
	userDefaultAvatar: (userId: string) =>
		[...profileKeys.all(), "default-avatar", userId] as const,
};

export const onboardingKeys = {
	all: () => ["onboarding"] as const,
	statuses: () => [...onboardingKeys.all(), "statuses"] as const,
};

export const budgetKeys = {
	all: () => ["budgets"] as const,
	lists: () => [...budgetKeys.all(), "list"] as const,
	list: (filters?: Record<string, unknown>) =>
		[...budgetKeys.lists(), { filters }] as const,
	details: () => [...budgetKeys.all(), "detail"] as const,
	detail: (budgetId: string) => [...budgetKeys.details(), budgetId] as const,
	members: (budgetId: string) =>
		[...budgetKeys.detail(budgetId), "members"] as const,
};

export const queryKeys = {
	teams: teamKeys,
	retros: retroKeys,
	profiles: profileKeys,
	onboarding: onboardingKeys,
	budgets: budgetKeys,
} as const;

// Usage:
// queryClient.invalidateQueries({ queryKey: queryKeys.teams.detail(teamId) })
// queryClient.invalidateQueries({ queryKey: queryKeys.teams.members(teamId) })
// queryClient.invalidateQueries({ queryKey: queryKeys.retros.detail(retroId) })
// queryClient.invalidateQueries({ queryKey: queryKeys.retros.invitations(retroId) })
