import { useState } from "react";
export function useNotification() {
  const [messageSucessForm, setMessageSucessForm] = useState(null);
  const [type, setType] = useState(null);

  const clearNotifications = () => {
    setMessageSucessForm(null);
    setType(null);
  };

  return {
    messageSucessForm,
    type,
    setMessageSucessForm,
    setType,
    clearNotifications,
  };
}
