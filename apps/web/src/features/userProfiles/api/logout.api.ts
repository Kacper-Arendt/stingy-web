import api from "@/utils/api";

export const logout = async (): Promise<void> => {
	return api<void>("api/auth/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
};
