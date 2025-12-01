import { Navigate, useLocation } from "react-router-dom"; 
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth(); 
    
    const location = useLocation(); 

    if (loading) {
        return <div className="loading">Cargando...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default ProtectedRoute;