// Test simple component
import React from 'react';

const TestPage: React.FC = () => {
    return (
        <div style={{ padding: '50px', background: '#1a1a2e', color: 'white', minHeight: '100vh' }}>
            <h1>Test Page - Giao diện hoạt động!</h1>
            <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                <p>✅ React đang chạy</p>
                <p>✅ CSS có thể load</p>
                <p>✅ Router hoạt động</p>
            </div>
            <div style={{ marginTop: '20px' }}>
                <a href="/login" style={{ color: '#64c8ff', marginRight: '20px' }}>Đi tới Login</a>
                <a href="/register" style={{ color: '#64c8ff', marginRight: '20px' }}>Đi tới Register</a>
                <a href="/" style={{ color: '#64c8ff' }}>Đi tới Landing</a>
            </div>
        </div>
    );
};

export default TestPage;
