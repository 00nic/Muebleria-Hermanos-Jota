import Notification from "./utils/Notification";
const ContactForm = ({ addContact, messageSucessForm, error }) => {
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addContact = (e) => {
    e.preventDefault();
    setMessageSucessForm("Mensaje enviado correctamente");
    setTimeout(() => {
      setMessageSucessForm("");
    }, 5000);
    setDataForm({
      name: "",
      email: "",
      message: "",
    });
  };
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
          value={dataForm.name}
          onChange={handleChange}
          required
        />

        <label className="contact-label">Email</label>
        <input
          className="contact-input"
          type="email"
          id="email_form"
          value={dataForm.email}
          onChange={handleChange}
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
