// src/api/authService.ts
import axiosClient from './axiosClient';
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
} from '../types/auth';

/**
 * Auth Service - Tập trung tất cả API calls liên quan đến authentication
 */

export const authService = {
    /**
     * Đăng nhập
     */
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await axiosClient.post<LoginResponse>('/auth/login', credentials);

        // Tự động lưu tokens
        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
        }

        return response.data;
    },

    /**
     * Đăng ký tài khoản mới
     */
    register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
        // Chỉ gửi username và password, không có email
        const { confirmPassword, ...registerData } = userData;
        const response = await axiosClient.post<RegisterResponse>('/auth/register', registerData);

        // Tự động lưu tokens sau khi đăng ký
        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
        }

        return response.data;
    },

    /**
     * Đăng xuất
     */
    logout: async (): Promise<void> => {
        try {
            // Gọi API đăng xuất (nếu backend yêu cầu)
            await axiosClient.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Luôn xóa tokens local
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        }
    },

    /**
     * Refresh access token khi hết hạn
     */
    refreshToken: async (): Promise<RefreshTokenResponse> => {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await axiosClient.post<RefreshTokenResponse>('/auth/refresh', {
            refreshToken,
        } as RefreshTokenRequest);

        // Cập nhật tokens mới
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        return response.data;
    },

    /**
     * Lấy thông tin user hiện tại từ token
     */
    getCurrentUser: async () => {
        const response = await axiosClient.get('/auth/me');
        return response.data;
    },

    /**
     * Kiểm tra xem user đã đăng nhập chưa
     */
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('accessToken');
    },

    /**
     * Lấy access token hiện tại
     */
    getAccessToken: (): string | null => {
        return localStorage.getItem('accessToken');
    },
};

export default authService;
