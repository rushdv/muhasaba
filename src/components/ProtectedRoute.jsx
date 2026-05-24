import { Navigate } from 'react-router-dom';
import { useSession } from '../lib/authClient';

const ProtectedRoute = ({ children }) => {
    const { data: session, isPending } = useSession();

    // Still loading session from server
    if (isPending) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gold-soft border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // No session — redirect to login
    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
