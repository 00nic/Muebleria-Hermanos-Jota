import { useState } from "react";

export function useNotification() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const clearNotifications = () => {
    setMessage("");
    setType("");
  };

  return {
    message,
    type,
    setMessage,
    setType,
    clearNotifications,
  };
}