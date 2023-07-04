export function valida(input){
  const tipoDeInput = input.dataset.tipo;
  if(validadores[tipoDeInput]){
    validadores[tipoDeInput](input)
  }

  if(input.validity.valid){
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = ""
  }else{
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input)
  };
};

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
]

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacio"
  },
  email: {
    valueMissing: "El campo email no puede estar vacio",
    typeMismatch: "El correo no es valido"
  },
  password: {
    valueMissing: "Este campo necesita contraseña",
    patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
  },
  nacimiento: {
    valueMissing: "El campo nacimiento no puede estar vacio",
    customError: "Debes tener al menos 18 años de edad"
  },
  numero: {
    valueMissing: "El campo número telefónico no puede estar vacio",
    patternMismatch: "El formato requerido es (XX-XXXX-XXXX)"
  },
  direccion: {
    valueMissing: "Debes ingresar una dirección",
    patternMismatch: "La dirección debe contener de 10 a 40 caracteres"
  },
  ciudad: {
    valueMissing: "Debes ingresar una ciudad",
    patternMismatch: "La ciudad debe contener de 4 a 10 caracteres"
  },
  estado: {
    valueMissing: "Debes ingresar un estado",
    patternMismatch: "El estado debe contener de 10 a 20 caracteres"
  }
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input)
};

function mostrarMensajeError(tipoDeInput, input){
  let mensaje = ""
  tipoDeErrores.forEach(error => {
    if(input.validity[error]){
      mensaje = mensajesDeError[tipoDeInput][error]
    }
  })

  return mensaje
};

function validarNacimiento(input){
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)){
    mensaje = "Debes tener al menos 18 años de edad";
  };

  input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha){
  const fechaActual = new Date();
  const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
  return diferenciaFechas < fechaActual;
};