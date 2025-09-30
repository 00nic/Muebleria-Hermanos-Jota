const Notification = ({ message, error }) => {
  if (message === "") {
    return null;
  }
  if (!error) return <div className="success">{message}</div>;

  return <div className="error">{message}</div>;
};

export default Notification;
