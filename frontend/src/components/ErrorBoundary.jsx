import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Global Error Boundary caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-marfil flex flex-col items-center justify-center p-6 text-center">
                    <div className="celestial-card p-12 max-w-lg border-red-200">
                        <h1 className="text-3xl font-serif italic text-emerald-950 mb-4">Something went wrong.</h1>
                        <p className="text-emerald-800/60 mb-8 leading-relaxed">
                            We encountered an unexpected error. Don't worry, your progress is likely safe.
                        </p>
                        <div className="bg-red-50 p-4 rounded-xl text-left mb-8 overflow-auto max-h-48">
                            <code className="text-xs text-red-600">
                                {this.state.error?.toString()}
                            </code>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="celestial-button px-8 py-3"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
