import type {RegisterUserPayload} from "@/features/auth/types/register.ts";
import {apiConfig} from "@/config/app.ts";

export const register = async (data: RegisterUserPayload) => {
    return await fetch(`${apiConfig.baseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};
