import {apiConfig} from "@/config/app";
import type {LoginUserPayload} from "@/features/auth/types/login.ts";

export const login = async (data: LoginUserPayload) => {
    return await fetch(
        `${apiConfig.baseUrl}/api/auth/identity/Login?useCookies=true`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        },
    );
};
