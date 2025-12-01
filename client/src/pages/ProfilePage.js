import { useAuth } from "../auth/AuthContext";

const ProfilePage = () => {
    const { user } = useAuth();

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
            </div>
        </div>
    );
};

export default ProfilePage;
