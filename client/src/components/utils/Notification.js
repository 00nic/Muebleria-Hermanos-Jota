const Notification = ({ message, type }) => {
    if (!message || !type) {
        return null;
    }
    console.log("Mostrando notificación:", { message, type });
    return (
        <div className={`notification notification-${type}`}>
            {type === "loading" && (
                <span className="notification-spinner"></span>
            )}
            {message}
        </div>
    );
};

export default Notification;
