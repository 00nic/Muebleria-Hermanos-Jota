import "./App.css";
import Navbar from "./components/NavBar";
import { useNotification } from "./context/NotificationContext";
import Notification from "./components/utils/Notification";
import AppRoutes from "./routes/AppRoutes";

function App() {
    const { message, type } = useNotification();

    return (
        <div>
            <Navbar />
            {message && <Notification message={message} type={type} />}
            <main>
                <AppRoutes />
            </main>
        </div>
    );
}

export default App;
