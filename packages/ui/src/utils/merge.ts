const merge = (...classes: (string | undefined)[]): string =>
	classes.filter(Boolean).join(" ");

export default merge;
