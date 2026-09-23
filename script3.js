/*
Solucion con validacion NO nativa y mensajes personalizados para cada campo del formulario.
*/

const inputFecha = document.getElementById("fechaNacimiento");
const btnToggleContraste = document.getElementById("btn-toggle-constraste");
const formulario = document.getElementById("form-datos");

// Definicion de valor maximo para la fecha.
const hoy = new Date();
const anio = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, "0");
const dia = String(hoy.getDate()).padStart(2, "0");
inputFecha.max = `${anio}-${mes}-${dia}`;

// Alternar estilo al hacer clic en el botón
btnToggleContraste.addEventListener("click", () => {
  // classList.toggle agrega la clase si no está, o la quita si ya está presente.
  // Devuelve 'true' si la clase quedó puesta, o 'false' si se removió.
  const isAltoContraste = document.body.classList.toggle("alto-contraste");

  if (isAltoContraste) {
    btnToggleContraste.textContent = "Desactivar Alto Contraste";
  } else {
    btnToggleContraste.textContent = "Activar Alto Contraste";
  }
});

// Función genérica para validar un campo individual
function validarCampo(input, spanError) {
  let mensaje = "";

  if (input.validity.valueMissing || input.value.trim() === "") {
    mensaje = "Este campo es obligatorio.";
  } else if (input.value.trim().length < input.minLength) {
    mensaje = `Debe tener al menos ${input.minLength} caracteres.`;
  } else if (input.validity.typeMismatch && input.type === "email") {
    mensaje = "Ingresa un formato de email válido (ej. usuario@dominio.com).";
  } else if (input.validity.rangeOverflow && input.type === "date") {
    mensaje = "La fecha no puede ser posterior al día de hoy.";
  } else if (input.validity.rangeUnderflow && input.type === "date") {
    mensaje = "La fecha ingresada no es válida.";
  } else if (input.validity.patternMismatch) {
    mensaje =
      "Este campo solo puede contener letras (no se permiten números ni símbolos).";
  }

  // Renderizar mensaje y alternar clases
  spanError.textContent = mensaje;

  if (mensaje !== "") {
    input.classList.add("input-error");
    return false;
  } else {
    input.classList.remove("input-error");
    return true;
  }
}

// Mapeo de campos y sus respectivos contenedores de error
const campos = [
  {
    input: document.getElementById("nombre"),
    span: document.getElementById("error-nombre"),
  },
  {
    input: document.getElementById("apellido"),
    span: document.getElementById("error-apellido"),
  },
  {
    input: document.getElementById("email"),
    span: document.getElementById("error-email"),
  },
  {
    input: document.getElementById("fechaNacimiento"),
    span: document.getElementById("error-fecha"),
  },
  {
    input: document.getElementById("pais"),
    span: document.getElementById("error-pais"),
  },
];

// Validacion para cada campo
campos.forEach(({ input, span }) => {
  //input.addEventListener('input', () => validarCampo(input, span)); //Se lanza mientras escribe el usuario
  input.addEventListener("change", () => validarCampo(input, span)); //Se lanza cuando el usuario sale del campo
});

// Manejo del envío del formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  let formularioValido = true;

  // Validar todos los campos juntos al intentar enviar
  campos.forEach(({ input, span }) => {
    const esValido = validarCampo(input, span);
    if (!esValido) {
      formularioValido = false;
    }
  });

  if (formularioValido) {
    alert("¡Formulario validado y enviado correctamente!");
    formulario.reset();
    // Limpiar clases de error tras reset
    campos.forEach(({ input, span }) => {
      span.textContent = "";
      input.classList.remove("input-error");
    });
  }
});
