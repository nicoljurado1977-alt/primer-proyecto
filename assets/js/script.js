// ===== 1. Menú hamburguesa responsive =====

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  hamburger.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", isOpen);
});

// Cierra el menú al hacer clic en un enlace (útil en mobile)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", false);
  });
});

// ===== 2. Barras de habilidades animadas al entrar en pantalla =====

const skillFills = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const percent = fill.dataset.percent;
        fill.style.width = percent + "%";
        skillObserver.unobserve(fill); // solo se anima una vez
      }
    });
  },
  { threshold: 0.4 }
);

skillFills.forEach((fill) => skillObserver.observe(fill));

// ===== 3. Cards de proyectos interactivas (mostrar/ocultar detalle) =====

document.querySelectorAll(".project-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".project-card");
    const expanded = card.classList.toggle("expanded");
    button.textContent = expanded ? "Ver menos" : "Ver más";
  });
});

// ===== 4. Validación de formulario en tiempo real =====

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMessage = document.getElementById("form-success");

const validators = {
  name: (value) => {
    if (value.trim().length === 0) return "El nombre es obligatorio.";
    if (value.trim().length < 2) return "El nombre es muy corto.";
    return "";
  },
  email: (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim().length === 0) return "El correo es obligatorio.";
    if (!regex.test(value.trim())) return "Escribe un correo válido.";
    return "";
  },
  message: (value) => {
    if (value.trim().length === 0) return "El mensaje es obligatorio.";
    if (value.trim().length < 10) return "Cuéntanos un poco más (mínimo 10 caracteres).";
    return "";
  },
};

function validateField(input, errorId, validatorKey) {
  const errorEl = document.getElementById(errorId);
  const errorText = validators[validatorKey](input.value);

  input.classList.remove("valid", "invalid");
  if (errorText) {
    input.classList.add("invalid");
    errorEl.textContent = errorText;
  } else {
    input.classList.add("valid");
    errorEl.textContent = "";
  }
  return errorText === "";
}

// Validación en tiempo real: se ejecuta mientras el usuario escribe
nameInput.addEventListener("input", () => validateField(nameInput, "name-error", "name"));
emailInput.addEventListener("input", () => validateField(emailInput, "email-error", "email"));
messageInput.addEventListener("input", () => validateField(messageInput, "message-error", "message"));

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isNameValid = validateField(nameInput, "name-error", "name");
  const isEmailValid = validateField(emailInput, "email-error", "email");
  const isMessageValid = validateField(messageInput, "message-error", "message");

  if (isNameValid && isEmailValid && isMessageValid) {
    successMessage.textContent = `¡Gracias, ${nameInput.value.trim()}! Tu mensaje fue enviado.`;
    form.reset();
    document.querySelectorAll(".form-group input, .form-group textarea")
      .forEach((el) => el.classList.remove("valid", "invalid"));
  } else {
    successMessage.textContent = "";
  }
});