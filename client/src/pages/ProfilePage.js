import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/utils/Button"; 

const ProfilePage = () => {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login"); 
    };

    return (
        <div className="profile-page">
            <h2>Mi Perfil</h2>
            <div className="profile-info">
                <div className="profile-field">
                    <strong>Nombre de usuario:</strong>
                    <span>{user.username}</span>
                </div>
                <div className="profile-field">
                    <strong>Email:</strong>
                    <span>{user.email}</span>
                </div>
                <div className="profile-field">
                    <strong>Rol:</strong>
                    <span>{user.role}</span>
                </div>
                <div className="profile-field">
                    <strong>ID:</strong>
                    <span>{user.id}</span>
                </div>
                
                <Button
                    onClick={handleLogout}
                    title="Cerrar Sesión"
                    className="btn-full btn-logout" 
                />
            </div>
        </div>
    );
};

export default ProfilePage;