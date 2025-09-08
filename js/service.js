const contactForm = document.getElementById("contacto-form");
const nameInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("mensaje");
const submitButton = document.querySelector(".formulario button");
let count = localStorage.getItem("carritoContador") || 0;
document.getElementById("carrito-contador").innerText = count;
function showSuccessMessage(contactForm) {
  contactForm.reset();
  const messageSuccess = document.createElement("p");
  messageSuccess.classList.add("messageSuccess");
  messageSuccess.textContent =
    "¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.";
  contactForm.insertBefore(messageSuccess, contactForm.firstChild);
  nameInput.focus();
  submitButton.disabled = true;

  setTimeout(() => {
    if (messageSuccess) {
      messageSuccess.classList.add("fade-out");
      setTimeout(() => {
        messageSuccess.remove();
        submitButton.disabled = false;
      }, 2000);
    }
  }, 1000);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(input, message, contactForm) {
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = message;
  contactForm.insertBefore(errorMessage, input.nextSibling);
  input.classList.add("input-error");
}

function clearError(input) {
  const error = input.nextElementSibling;
  if (error && error.classList.contains("error-message")) {
    error.remove();
  }
  input.classList.remove("input-error");
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  let hasErrors = false;

  clearError(nameInput);
  clearError(emailInput);
  clearError(emailInput);
  clearError(messageInput);

  if (name.length < 2) {
    showError(
      nameInput,
      "El nombre debe tener al menos 2 caracteres",
      contactForm
    );
    hasErrors = true;
  }
  if (email.length < 5) {
    showError(
      emailInput,
      "El email debe tener al menos 5 caracteres",
      contactForm
    );
    hasErrors = true;
  }
  if (!isValidEmail(email)) {
    showError(emailInput, "Por favor, ingresa un email válido", contactForm);
    hasErrors = true;
  }

  if (message.length < 10) {
    showError(
      messageInput,
      "El mensaje debe tener al menos 10 caracteres",
      contactForm
    );
    hasErrors = true;
  }
  if (!hasErrors) {
    showSuccessMessage(contactForm);
  }
});
