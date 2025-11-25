import "./App.css";
import Navbar from "./components/NavBar";

import { useCart } from "./context/CartContext";
import { useNotification } from "./context/NotificationContext";
import Notification from "./components/utils/Notification";
import AppRoutes from "./routes/AppRoutes";

function App() {
    const { cartCount, cartTotal } = useCart();
    const { message, type } = useNotification();

    return (
        <div>
            <Navbar cartCount={cartCount} cartTotal={cartTotal} />
            {message && <Notification message={message} type={type} />}
            <main>
                <AppRoutes />
            </main>
        </div>
    );
}

export default App;
