export interface User {
    id: number;
    username: string;
    email?: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    id: number;
    accessToken: string;
    refreshToken: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    confirmPassword?: string;
}

export interface RegisterResponse {
    username: string;
    id: number;
    accessToken: string;
    refreshToken: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface AuthError {
    error: string;
    message?: string;
}







