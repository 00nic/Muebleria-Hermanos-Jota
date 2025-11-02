import { useState } from "react";
export function useNotification() {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  const clearNotifications = () => {
    setMessage(null);
    setType(null);
  };

  return {
    message,
    type,
    setMessage,
    setType,
    clearNotifications,
  };
}
