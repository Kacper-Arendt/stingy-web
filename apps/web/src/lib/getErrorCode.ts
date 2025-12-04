// Helper to extract error code from error objects with optional chaining and type safety
type ErrorWithCauseCode = {
	cause?: {
		code?: unknown;
	} | null;
};

export function getErrorCode(error: unknown): number | undefined {
	if (typeof error === "object" && error !== null && "cause" in error) {
		const cause = (error as ErrorWithCauseCode).cause;
		if (cause && typeof cause === "object" && "code" in cause) {
			const code = cause.code;
			if (typeof code === "number") return code;
			if (typeof code === "string" && !Number.isNaN(Number(code)))
				return Number(code);
		}
	}
	return undefined;
}
