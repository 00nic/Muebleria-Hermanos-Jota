const Notification = ({ message, type }) => {
  if (message === "" && type === null) {
    return null;
  }
  return <div className={type}>{message}</div>;
};

export default Notification;
