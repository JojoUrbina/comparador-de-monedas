const estadoActual = "estado";
const estado = JSON.parse(localStorage.getItem(estadoActual));
const estadoEstadisticasTrivia = { puntos: 0, contador: 0 };
estadoEstadisticasTrivia.maximoPuntaje =
  +localStorage.getItem("maximoPuntajeTrivia") || 0;
document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

let idTemporizadorNuevaTrivia;

function iniciarApp() {
  actualizarTextoElemento(
    "#estadisticas-puntuacion-maxima",
    estadoEstadisticasTrivia.maximoPuntaje
  );
  configurarEventosDeRespuestas(estado);
  desactivarRespuestas();

  document
    .querySelector("#btn-iniciar-trivia")
    .addEventListener("click", () => {
      document.querySelector(`#btn-iniciar-trivia`).disabled = true;
      iniciarTrivia(estado);
    });
}

function iniciarTrivia(estado) {
  habilitarRespuestas();
  const tiempoEnSegundos = 20;
  const MIL_MILISEGUNDOS = 1000;
  const tiempoMaximoTrivia = tiempoEnSegundos * MIL_MILISEGUNDOS;

  estadoEstadisticasTrivia.puntos = 0;
  estadoEstadisticasTrivia.contador = tiempoMaximoTrivia / MIL_MILISEGUNDOS;

  actualizarTextoElemento(
    "#estadisticas-puntuacion",
    estadoEstadisticasTrivia.puntos
  );
  actualizarTextoElemento(
    "#estadisticas-contador",
    estadoEstadisticasTrivia.contador
  );

  crearNuevaTrivia(estado);

  const idInterval = setInterval(() => {
    estadoEstadisticasTrivia.contador -= 1;
    actualizarTextoElemento(
      "#estadisticas-contador",
      estadoEstadisticasTrivia.contador
    );
  }, MIL_MILISEGUNDOS);

  const timeoutId = setTimeout(() => {
    document.querySelector(`#btn-iniciar-trivia`).disabled = false;
    clearTimeout(idTemporizadorNuevaTrivia);
    clearInterval(idInterval);
    desactivarRespuestas();
    reiniciarEstilos();
  }, tiempoMaximoTrivia);
  setTimeout(() => clearTimeout(timeoutId), tiempoMaximoTrivia + 1);
}

function configurarEventosDeRespuestas(estado) {
  reiniciarEstilos();
  const inputsRespuestas = [
    ...document.querySelectorAll("label.list-group-item "),
  ];
  for (const [indice, input] of inputsRespuestas.entries()) {
    input.addEventListener("click", () => {
      const tiempoDeIntervalo = 500;
      const indiceRespuestaCorrecta = buscarIndiceRespuestaCorrecta(estado);
      inputsRespuestas[indiceRespuestaCorrecta].classList.add("opcionCorrecta");
      const isRespuestaCorrecta = indice === indiceRespuestaCorrecta;

      actualizarEstadisticaPuntuacion(isRespuestaCorrecta);

      aplicarEstilosRespuesta(input, isRespuestaCorrecta);
      desactivarRespuestas();
      actualizarTextoElemento(
        "#estadisticas-puntuacion",
        estadoEstadisticasTrivia.puntos
      );
      actualizarTextoElemento(
        "#estadisticas-puntuacion-maxima",
        estadoEstadisticasTrivia.maximoPuntaje
      );

      idTemporizadorNuevaTrivia = setTimeout(
        () => crearNuevaTrivia(estado),
        tiempoDeIntervalo
      );

      setTimeout(() => {
        clearTimeout(idTemporizadorNuevaTrivia);
      }, tiempoDeIntervalo + 1);
    });
  }
}

function crearNuevaTrivia(estado) {
  const indiceAleatorio = obtenerIndiceAleatorio(estado);
  alternarPaisCorrectoTrivia(estado, indiceAleatorio);
  mostrarBanderaTrivia(estado.dataPaisesActual[indiceAleatorio]);
  renderizarOpcionesTrivia(generarRespuestasTrivia(estado));
  reiniciarEstilos();
  habilitarRespuestas();
}

function aplicarEstilosRespuesta(inputRespuesta, isRespuestaCorrecta) {
  const claseOpcion = isRespuestaCorrecta ? "opcionCorrecta" : "opcionErrada";
  inputRespuesta.classList.add(claseOpcion);
  inputRespuesta.classList.add("opcionElegida");
}
function generarRespuestasTrivia(estado) {
  //crear funcion para que no se repitan las opciones
  const respuestaCorrecta = estado.dataPaisesActual.find(
    (pais) => pais.paisCorrectoTrivia
  ).nombrePais;
  const opciones = [
    obtenerNombreAleatorioPais(estado),
    respuestaCorrecta,
    obtenerNombreAleatorioPais(estado),
  ];

  // Ordena las opciones de manera aleatoria dos veces para aumentar la aleatoriedad
  estado.dataTrivia.respuestas = [...opciones]

 for (let i = 0; i < 3; i++) estado.dataTrivia.respuestas.sort(
  (opcion) => Math.round(Math.random() * 2) - 1
  
)
for (let i = 0; i < 3; i++) console.log("se barajea 3 veces");
  localStorage.setItem(estadoActual, JSON.stringify(estado));
  return estado.dataTrivia.respuestas;
}

function renderizarOpcionesTrivia(opcionesAlAzar) {
  const elementosOpciones = document.querySelectorAll("span.list-group-item ");

  for (const [indice, elemento] of opcionesAlAzar.entries()) {
    elementosOpciones[indice].textContent = elemento;
  }
}
function cambiarSrcImagen(elemento, src) {
  const elementoSeleccionado = document.querySelector(`${elemento}`);
  elementoSeleccionado.src = src;
}
function actualizarTextoElemento(elemento, texto) {
  const elementoSeleccionado = document.querySelector(`${elemento}`);
  elementoSeleccionado.textContent = texto.toLocaleString("en-US");
}
function obtenerIndiceAleatorio(estado) {
  return Math.round(Math.random() * estado.dataPaisesActual.length);
}
function obtenerNombreAleatorioPais(estado) {
  return estado.dataPaisesActual[obtenerIndiceAleatorio(estado)].nombrePais;
}
function mostrarBanderaTrivia(pais) {
  cambiarSrcImagen("#imagen-bandera-principal", pais.srcBanderaSvgPais);
}

function alternarPaisCorrectoTrivia(estado, indice) {
  estado.dataPaisesActual.forEach((pais) => (pais.paisCorrectoTrivia = false));
  estado.dataPaisesActual[indice].paisCorrectoTrivia = true;
  localStorage.setItem(estadoActual, JSON.stringify(estado));
}

function actualizarEstadisticaPuntuacion(isRespuestaCorrecta) {
  if (isRespuestaCorrecta) {
    estadoEstadisticasTrivia.puntos += 1;
  }
  if (
    estadoEstadisticasTrivia.puntos > estadoEstadisticasTrivia.maximoPuntaje
  ) {
    estadoEstadisticasTrivia.maximoPuntaje = estadoEstadisticasTrivia.puntos;
    localStorage.setItem(
      "maximoPuntajeTrivia",
      estadoEstadisticasTrivia.maximoPuntaje.toString()
    );
  }
}

function reiniciarEstilos() {
  const inputsRespuestas = [
    ...document.querySelectorAll("label.list-group-item "),
  ];
  inputsRespuestas.forEach((input) => {
    input.classList.remove("opcionCorrecta");
    input.classList.remove("opcionElegida");
    input.classList.remove("opcionErrada");
  });
}
function habilitarRespuestas() {
  const inputsRespuestas = [
    ...document.querySelectorAll("label.list-group-item "),
  ];
  inputsRespuestas.forEach((opcion) => {
    document.querySelector(`input#${opcion.htmlFor}`).disabled = false;
  });
}
function desactivarRespuestas() {
  const inputsRespuestas = [
    ...document.querySelectorAll("label.list-group-item "),
  ];
  inputsRespuestas.forEach((opcion) => {
    document.querySelector(`input#${opcion.htmlFor}`).disabled = true;
  });
}

function buscarIndiceRespuestaCorrecta(estado) {
  const paisTrivia = estado.dataPaisesActual.find(
    (pais) => pais.paisCorrectoTrivia
  );
  const respuestas = estado.dataTrivia.respuestas;

  return respuestas.findIndex(
    (respuesta) => respuesta === paisTrivia.nombrePais
  );
}
