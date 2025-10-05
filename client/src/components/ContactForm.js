import Notification from "./utils/Notification";
const ContactForm = ({
  nameForm,
  emailForm,
  messageForm,
  handlerNameChange,
  handlerEmailChange,
  handlerMensajeChange,
  addContact,
  messageSucessForm,
  error,
}) => {
  return (
    <div className="contact">
      <h2 className="contact-title">Contacto</h2>
      {messageSucessForm !== "" && !error && (
        <Notification message={messageSucessForm} error={error} />
      )}
      <form className="contact-form" id="contacto-form" onSubmit={addContact}>
        <label className="contact-label">Nombre</label>
        <input
          className="contact-input"
          type="text"
          id="name_form"
          value={nameForm}
          onChange={handlerNameChange}
          required
        />

        <label className="contact-label">Email</label>
        <input
          className="contact-input"
          type="email"
          id="email_form"
          value={emailForm}
          onChange={handlerEmailChange}
          required
        />

        <label className="contact-label">Mensaje</label>
        <textarea
          className="contact-textarea"
          id="message"
          name="message_form"
          value={messageForm}
          onChange={handlerMensajeChange}
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
