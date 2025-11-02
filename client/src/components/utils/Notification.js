const Notification = ({ message, type }) => {
  if (!message || !type) {
    return null;
  }
  return <div className={`notification notification-${type}`}>{message}</div>;
};

export default Notification;
