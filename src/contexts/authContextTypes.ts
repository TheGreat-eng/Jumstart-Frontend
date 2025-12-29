// src/contexts/authContextTypes.ts
import type { User, LoginRequest, RegisterRequest } from '../types/auth';

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (userData: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
}
