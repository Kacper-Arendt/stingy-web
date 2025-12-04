import { apiConfig } from "@/config/app";

export default async function api<T>(
	url: string,
	options: RequestInit,
	returnRaw = false,
): Promise<T> {
	const response = await fetch(`${apiConfig.baseUrl}/${url}`, {
		...options,
		credentials: "include",
	});

	if (returnRaw) {
		return response as unknown as T;
	}

	if (!response.ok) {
		throw new Error(
			`API Error: ${response.status} ${response.statusText} ${response.url}`,
			{
				cause: {
					code: response.status,
					url: response.url,
				},
			},
		);
	}

	return await response.json().catch(() => null);
}
