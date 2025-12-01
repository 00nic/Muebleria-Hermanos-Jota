import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { createUser } from '../service/register';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { showNotification } = useNotification();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            showNotification("Las contraseñas no coinciden.", "error");
            return;
        }

        setIsSubmitting(true);
        const userDataToSend = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        };

        try {
            await createUser(userDataToSend);

            showNotification("¡Registro exitoso! Ya puedes iniciar sesión.", "success");
            navigate('/login');

        } catch (error) {
            console.error("Error en el registro:", error);
            showNotification(
                error.message || "Error al registrar. Intenta con otro email.",
                "error"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="register-page-container">
            <h2 className="register-title">Crear Cuenta</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label className="register-label" htmlFor="username">Nombre de Usuario</label>
                <input
                    className="register-input"
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <label className="register-label" htmlFor="email">Email</label>
                <input
                    className="register-input"
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label className="register-label" htmlFor="password">Contraseña</label>
                <input
                    className="register-input"
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <label className="register-label" htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                    className="register-input"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button
                    className="register-button btn"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Registrando..." : "Registrarse"}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;