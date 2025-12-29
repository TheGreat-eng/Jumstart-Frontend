// Simple Login Page - No Auth Context
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SimpleLoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Username: ${username}, Password: ${password}`);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #1b2735, #090a0f)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '40px',
                borderRadius: '20px',
                maxWidth: '400px',
                width: '100%',
                border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
                <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>
                    🚀 Đăng nhập
                </h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ color: 'white', display: 'block', marginBottom: '8px' }}>
                            👤 Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập tên đăng nhập"
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '10px',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                background: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ color: 'white', display: 'block', marginBottom: '8px' }}>
                            🔒 Mật khẩu
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '10px',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                background: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '14px',
                            borderRadius: '10px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        ✨ Đăng nhập
                    </button>
                </form>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p style={{ color: 'white', margin: '10px 0' }}>
                        Chưa có tài khoản?{' '}
                        <Link to="/simple-register" style={{ color: '#64c8ff' }}>
                            Đăng ký ngay
                        </Link>
                    </p>
                    <Link to="/" style={{ color: '#64c8ff' }}>
                        ← Quay về trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SimpleLoginPage;
