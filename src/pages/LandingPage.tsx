// src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/LandingPage.css';

const LandingPage: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="landing-container">
            {/* Các lớp ngôi sao lấp lánh */}
            <div className="stars"></div>
            <div className="stars2"></div>
            <div className="stars3"></div>

            {/* Các hành tinh bay */}
            <div className="planet planet1"></div>
            <div className="planet planet2"></div>
            <div className="planet planet3"></div>

            {/* Shooting stars */}
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>

            {/* Nội dung chính */}
            <div className="landing-content">
                <div className="hero-section">
                    <h1 className="glowing-text">
                        🌌 Chào mừng đến với Vũ Trụ
                    </h1>
                    <p className="subtitle">
                        Khám phá những điều kỳ diệu trong thế giới số của chúng tôi
                    </p>

                    {isAuthenticated ? (
                        <div className="user-section">
                            <div className="welcome-card">
                                <h2>👋 Xin chào, {user?.username}!</h2>
                                <p>Bạn đã sẵn sàng cho cuộc phiêu lưu chưa?</p>
                                <div className="button-group">
                                    <button className="cta-button explore">
                                        🚀 Khám phá ngay
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="cta-button secondary"
                                    >
                                        🚪 Đăng xuất
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="cta-section">
                            <div className="button-group">
                                <Link to="/login" className="cta-button primary">
                                    ✨ Đăng nhập
                                </Link>
                                <Link to="/register" className="cta-button secondary">
                                    🚀 Đăng ký ngay
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Features Section */}
                <div className="features-section">
                    <div className="feature-card">
                        <div className="feature-icon">🌟</div>
                        <h3>Trải nghiệm độc đáo</h3>
                        <p>Giao diện vũ trụ lấp lánh đầy mê hoặc</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔐</div>
                        <h3>Bảo mật tuyệt đối</h3>
                        <p>Hệ thống xác thực an toàn và hiện đại</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Tốc độ ánh sáng</h3>
                        <p>Hiệu suất vượt trội với công nghệ tiên tiến</p>
                    </div>
                </div>

                {/* Footer */}
                <footer className="landing-footer">
                    <p>✨ Made with love in the universe ✨</p>
                    <p className="copyright">© 2025 Space Explorer. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;
