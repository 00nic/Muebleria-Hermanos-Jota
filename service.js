const contactForm = document.getElementById('contacto-form');
const nameInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('mensaje');
const submitButton = document.querySelector('.formulario button');


contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    if (name && email && message) {
        contactForm.reset();
        const messageSuccess = document.createElement('p');
            messageSuccess.classList.add('messageSuccess')
            messageSuccess.textContent = '¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.';
            contactForm.insertBefore(messageSuccess, contactForm.firstChild);
        nameInput.focus();
        submitButton.disabled = true;

        setTimeout(() => {
            if(messageSuccess){
                messageSuccess.classList.add('fade-out');
                setTimeout(() => {
                    messageSuccess.remove();
                    submitButton.disabled = false;
                }, 2000);
            }
        }, 1000);
    }
});
