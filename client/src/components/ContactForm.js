import Notification from "./Notification";
const ContactForm = ({
  nameForm,
  emailForm,
  messageForm,
  handlerNameChange,
  handlerEmailChange,
  handlerMensajeChange,
  addContact,
  message,
  error,
}) => {
  return (
    <div>
      <h2>Contacto</h2>
      {message != "" && !error && (
        <Notification message={message} error={error} />
      )}
      <form className="formulario" id="contacto-form" onSubmit={addContact}>
        <label>Nombre</label>
        <input
          type="text"
          id="name_form"
          value={nameForm}
          onChange={handlerNameChange}
          required
        />

        <label>Email</label>
        <input
          type="text"
          id="email_form"
          value={emailForm}
          onChange={handlerEmailChange}
          required
        />

        <label>Mensaje</label>
        <textarea
          id="message"
          name="message_form"
          value={messageForm}
          onChange={handlerMensajeChange}
        ></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ContactForm;
