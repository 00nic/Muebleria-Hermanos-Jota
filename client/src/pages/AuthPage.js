import LoginForm from '../components/auth/LoginForm';
import RegisterForm from './RegisterPage';
import { Link, useLocation } from 'react-router-dom';

const AuthPage = () => {
    const location = useLocation();
    const isRegisterMode = location.search.includes('mode=register');

    return (
        <div className="auth-container">
            {isRegisterMode ? <RegisterForm /> : <LoginForm />}

            <div className="auth-footer-toggle">
                {isRegisterMode ? (
                    <p>
                        ¿Ya tienes cuenta?
                        <Link to="/auth?mode=login" className="toggle-link"> Inicia Sesión</Link>
                    </p>
                ) : (
                    <p>
                        ¿No tienes cuenta?
                        <Link to="/auth?mode=register" className="toggle-link"> Regístrate</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthPage;