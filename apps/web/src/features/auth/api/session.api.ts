import api from "@/utils/api";
import type { IUser } from "../types/session";

export const getUser = async () => {
	try {
		return await api<IUser>("api/auth/me", {
			method: "GET",
		});
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		console.log(err);
		if (err.message?.includes("401")) {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const error: any = new Error("Unauthorized");
			error.status = 401;
			throw error;
		}
		throw err;
	}
};

export const logout = async () => {
	await api("api/auth/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
};
