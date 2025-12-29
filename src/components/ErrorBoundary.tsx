// src/components/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '50px',
                    background: '#ff4444',
                    color: 'white',
                    minHeight: '100vh',
                    fontFamily: 'monospace'
                }}>
                    <h1>⚠️ Có lỗi xảy ra!</h1>
                    <pre style={{
                        background: 'rgba(0,0,0,0.3)',
                        padding: '20px',
                        borderRadius: '10px',
                        overflow: 'auto'
                    }}>
                        {this.state.error?.toString()}
                        {'\n\n'}
                        {this.state.error?.stack}
                    </pre>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            background: 'white',
                            color: '#ff4444',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Tải lại trang
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
