export function useDate() {
	const defaultFormatDate = (date: Date) => {
		return new Intl.DateTimeFormat("pl-PL", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		}).format(date);
	};

	return {
		defaultFormatDate,
	};
}
