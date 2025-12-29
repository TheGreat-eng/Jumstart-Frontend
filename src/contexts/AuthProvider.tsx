// src/contexts/AuthProvider.tsx
import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './authContext';
import authService from '../api/authService';
import type { LoginRequest, RegisterRequest } from '../types/auth';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<{ id: number; username: string; email?: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Đổi thành false để không block UI

    useEffect(() => {
        // Kiểm tra xem user đã đăng nhập chưa khi app khởi động
        const initAuth = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    // Chỉ gọi API khi có token
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Failed to get current user:', error);
                // Token có thể đã hết hạn, xóa nó đi
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginRequest) => {
        const response = await authService.login(credentials);
        setUser({
            id: response.id,
            username: response.username,
        });
    };

    const register = async (userData: RegisterRequest) => {
        const response = await authService.register(userData);
        setUser({
            id: response.id,
            username: response.username,
        });
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
