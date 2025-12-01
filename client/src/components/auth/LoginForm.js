import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useNotification } from "../../context/NotificationContext";
<<<<<<< HEAD

const API_BASE_URL= process.env.REACT_APP_API_URL || "http://localhost:3000/api/auth/login"

=======
import { loginRequest } from "../../service/login";
>>>>>>> 5cb978bad9a8cef7dc50599d722b163f3efca2be
const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const token = await loginRequest(dataForm);
            login(token);
            showNotification("¡Inicio de sesión exitoso!", "success");
            navigate("/");
        } catch (error) {
            console.error("Error en login:", error);
            showNotification(
                error.message ||
                    "Error al iniciar sesión. Verifica tus credenciales.",
                "error"
            );
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div>
            <h2 className="login-tittle">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label className="login-label">Email</label>
                <input
                    className="login-input"
                    type="email"
                    name="email"
                    value={dataForm.email}
                    onChange={handleChange}
                />
                <label className="login-label">Password</label>
                <input
                    className="login-input"
                    type="password"
                    name="password"
                    value={dataForm.password}
                    onChange={handleChange}
                />
                <button
                    className="login-button"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Iniciando sesión..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
