const estadoActual = "estado";
const estado = JSON.parse(localStorage.getItem(estadoActual));
//hasta ahora solo muestra 3 nombres y uno de ellos es el correcto
iniciarTrivia(estado);

function iniciarTrivia(estado) {
  const indiceAleatorio = obtenerIndiceAleatorio(estado);
  alternarPaisCorrectoTrivia(estado, indiceAleatorio);
  mostrarBanderaTrivia(estado.dataPaisesActual[indiceAleatorio]);
  renderizarOpcionesTrivia(generarRespuestasTrivia(estado));
  configurarEventosDeRespuestas(estado);
}
function reiniciarTrivia(estado) {
  const indiceAleatorio = obtenerIndiceAleatorio(estado);
  alternarPaisCorrectoTrivia(estado, indiceAleatorio);
  mostrarBanderaTrivia(estado.dataPaisesActual[indiceAleatorio]);
  renderizarOpcionesTrivia(generarRespuestasTrivia(estado));
  reiniciarEstilos();
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
    obtenerNombreAleatorioPais(estado),
    respuestaCorrecta,
  ];

  // Ordena las opciones de manera aleatoria dos veces para aumentar la aleatoriedad
  const opcionesAlAzar = [...opciones].sort(
    (opcion) => Math.round(Math.random() * 2) - 1
  );
  estado.dataTrivia.respuestas = opcionesAlAzar.sort(
    (opcion) => Math.round(Math.random() * 2) - 1
  );
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
function cambiarTextoElemento(elemento, texto) {
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
function desactivarRespuestas(elementosOpciones) {
  elementosOpciones.forEach((opcion) => {
    document.querySelector(`input#${opcion.htmlFor}`).disabled = true;
  });
}

function alternarPaisCorrectoTrivia(estado, indice) {
  estado.dataPaisesActual.forEach((pais) => (pais.paisCorrectoTrivia = false));
  estado.dataPaisesActual[indice].paisCorrectoTrivia = true;
  localStorage.setItem(estadoActual, JSON.stringify(estado));
}
function configurarEventosDeRespuestas(estado) {
  reiniciarEstilos();
  const inputsRespuestas = [
    ...document.querySelectorAll("label.list-group-item "),
  ];
  for (const [indice, input] of inputsRespuestas.entries()) {
    input.addEventListener("click", () => {
      const paisTrivia = estado.dataPaisesActual.find(
        (pais) => pais.paisCorrectoTrivia
      );
      const respuestas = estado.dataTrivia.respuestas;
      const indiceRespuestaCorrecta = respuestas.findIndex(
        (respuesta) => respuesta === paisTrivia.nombrePais
      );
      inputsRespuestas[indiceRespuestaCorrecta].classList.add("opcionCorrecta");
      const isRespuestaCorrecta = indice === indiceRespuestaCorrecta;
      aplicarEstilosRespuesta(input, isRespuestaCorrecta);
      desactivarRespuestas(inputsRespuestas);

      const timeoutId = setTimeout(() => reiniciarTrivia(estado), 2000);

      setTimeout(() => {
        clearTimeout(timeoutId);
      }, 2001);
    });
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
    document.querySelector(`input#${input.htmlFor}`).disabled = false;
  });
}
