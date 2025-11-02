import Notification from "./utils/Notification";
import { useNotification } from "../hooks/useNotification";
import { useState } from "react";
const ContactForm = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { message, type, setMessage, setType, clearNotifications } =
    useNotification();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addContact = (e) => {
    e.preventDefault();
    setMessage("Mensaje enviado correctamente");
    setType("success");
    setTimeout(() => {
      clearNotifications();
    }, 5000);
    setDataForm({
      name: "",
      email: "",
      message: "",
    });
    console.log("Formulario enviado:", dataForm);
  };
  return (
    <div className="contact">
      <h2 className="contact-title">Contacto</h2>
      {message !== "" && type === "success" && (
        <Notification message={message} type={type} />
      )}
      <form className="contact-form" id="contacto-form" onSubmit={addContact}>
        <label className="contact-label">Nombre</label>
        <input
          className="contact-input"
          type="text"
          id="name_form"
          value={dataForm.name}
          onChange={handleChange}
          name="name"
          required
        />

        <label className="contact-label">Email</label>
        <input
          className="contact-input"
          type="email"
          id="email_form"
          value={dataForm.email}
          onChange={handleChange}
          name="email"
          required
        />

        <label className="contact-label">Mensaje</label>
        <textarea
          className="contact-textarea"
          id="message"
          name="message"
          value={dataForm.message}
          onChange={handleChange}
          required
        ></textarea>
        <button className="btn" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
