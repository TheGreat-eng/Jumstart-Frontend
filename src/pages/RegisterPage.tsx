// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/AuthPages.css';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validate
        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp!');
            return;
        }

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự!');
            return;
        }

        setIsLoading(true);

        try {
            await register({ username, password });
            navigate('/'); // Chuyển về trang chủ sau khi đăng ký thành công
        } catch (error) {
            const err = error as { response?: { data?: { error?: string } } };
            setError(err.response?.data?.error || 'Đăng ký thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="stars"></div>
            <div className="stars2"></div>
            <div className="stars3"></div>

            <div className="auth-card">
                <div className="auth-header">
                    <h2>✨ Đăng ký</h2>
                    <p>Tham gia vào vũ trụ của chúng tôi!</p>
                </div>

                {error && (
                    <div className="error-message">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="username">👤 Tên đăng nhập</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Chọn tên đăng nhập"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={isLoading}
                            minLength={3}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">🔒 Mật khẩu</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Tạo mật khẩu (tối thiểu 6 ký tự)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            minLength={6}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">🔐 Xác nhận mật khẩu</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={isLoading}
                    >
                        {isLoading ? '⏳ Đang xử lý...' : '🚀 Đăng ký'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Đã có tài khoản? {' '}
                        <Link to="/login" className="auth-link">
                            Đăng nhập ngay
                        </Link>
                    </p>
                    <Link to="/" className="auth-link">
                        ← Quay về trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
