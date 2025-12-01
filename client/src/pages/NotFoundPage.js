import { Link, useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
    const navigate = useNavigate();

    const volverAtras = () => {
        navigate(-1);
    };

    return (
        <div className="not-found">
            <h1 className="not-found-code">404</h1>
            <h2>Página no encontrada</h2>
            <p>Lo sentimos, la página que buscas no existe o fue movida.</p>
            <div className="not-found-actions">
                <Link to="/" className="btn btn-primary">
                    Ir al inicio
                </Link>
                <button onClick={volverAtras} className="btn btn-secondary">
                    Volver atras
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
