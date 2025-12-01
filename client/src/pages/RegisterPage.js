import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import { createUser } from "../service/register";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [dataForm, setDataForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        if (dataForm.password !== dataForm.confirmPassword) {
            showNotification("Las contraseñas no coinciden", "error");
            return;
        }

        if (dataForm.password.length < 6) {
            showNotification("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setIsSubmitting(true);

        const { confirmPassword, ...userDataToSend } = dataForm;

        try {
            await createUser(userDataToSend);
            showNotification(
                "Registro exitoso. Por favor inicia sesion.",
                "success"
            );
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
            showNotification(
                error.message || "Error al registrar usuario",
                "error"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label className="register-label">Username</label>
                <input
                    className="register-input"
                    type="text"
                    name="username"
                    value={dataForm.username}
                    onChange={handleChange}
                    required
                />
                <label className="register-label">Email</label>
                <input
                    className="register-input"
                    type="email"
                    name="email"
                    value={dataForm.email}
                    onChange={handleChange}
                    required
                />
                <label className="register-label">Password</label>
                <input
                    className="register-input"
                    type="password"
                    name="password"
                    value={dataForm.password}
                    onChange={(e) =>
                        setDataForm({ ...dataForm, password: e.target.value })
                    }
                />
                <label className="register-label">Confirm Password</label>
                <input
                    className="register-input"
                    type="password"
                    name="confirmPassword"
                    value={dataForm.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button
                    className="register-button"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
