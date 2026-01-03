import { useState } from "react";
import z from "zod";

export function useFormErrors() {
	const [errors, setErrors] = useState<Record<string, string[]>>({});

	const setFormErrors = (error: z.ZodError) =>
		setErrors(z.flattenError(error).fieldErrors);

	const clearErrors = () => setErrors({});

	return {
		errors,
		setFormErrors,
		clearErrors,
	};
}
