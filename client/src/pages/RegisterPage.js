import { useState } from "react";
import { createUser } from "../service/register";
const RegisterPage = () => {
    const [dataForm, setDataForm] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createUser(dataForm);
        } catch (error) {
            console.error("Registration error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2 className="register-title">Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label className="register-label">Username</label>
                <input
                    className="register-input"
                    type="text"
                    name="username"
                    value={dataForm.username}
                    onChange={(e) =>
                        setDataForm({ ...dataForm, username: e.target.value })
                    }
                />
                <label className="register-label">Email</label>
                <input
                    className="register-input"
                    type="email"
                    name="email"
                    value={dataForm.email}
                    onChange={(e) =>
                        setDataForm({ ...dataForm, email: e.target.value })
                    }
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
