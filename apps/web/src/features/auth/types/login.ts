export interface LoginUserPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    tokenType: "Bearer";
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
}
