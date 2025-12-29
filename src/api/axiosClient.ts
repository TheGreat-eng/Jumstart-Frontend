// src/api/axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api', // Đổi port nếu backend chạy port khác
    headers: {
        'Content-Type': 'application/json',
    },
});

// Tự động đính kèm token vào mọi request nếu có
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Xử lý refresh token khi access token hết hạn
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi 401 và chưa retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                
                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                // Gọi API refresh token
                const response = await axios.post('http://localhost:8080/api/auth/refresh', {
                    refreshToken,
                });

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                // Lưu tokens mới
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                // Thử lại request ban đầu với token mới
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosClient(originalRequest);
            } catch (refreshError) {
                // Refresh token thất bại, xóa tokens và chuyển về trang login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
