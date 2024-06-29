const estado = JSON.parse(localStorage.getItem("estado"));

function renderizarBlog(estado) {
  const paisSeleccionado =
    estado.dataPaisesActual.find((pais) => pais.blogPais) ||
    estado.dataPaisesActual.find((pais) => pais.nombrePais === "España");
  //seccion heroe
  actualizarTextoElemento(
    "#heroe-nombre-principal",
    paisSeleccionado.nombrePais
  );
  actualizarTextoElemento(
    "#heroe-nombre-nativo",
    paisSeleccionado.nombreNativoPais
  );
  actualizarTextoElemento(
    "#heroe-nombre-oficial",
    paisSeleccionado.nombreOficialPais
  );
  actualizarTextoElemento("#heroe-nombre-cca2", paisSeleccionado.cca2Pais);

  actualizarSrcAltImagen(
    "#imagen-bandera-principal",
    paisSeleccionado.srcBanderaSvgPais,
    paisSeleccionado.altBanderaPais
  );
  actualizarSrcAltImagen(
    "#imagen-bandera-escudo",
    paisSeleccionado.srcEscudoPais,
    paisSeleccionado.altBanderaPais
  );
  //fin de seccion Heroe

  //inicio seccion caracteristicas-principales
  actualizarTextoElemento(
    "#caracteristicas-principales-area",
    paisSeleccionado.areaPais.toLocaleString("en-US") + " Km²"
  );
  actualizarTextoElemento(
    "#caracteristicas-principales-poblacion",
    paisSeleccionado.poblacionPais.toLocaleString("en-US") + " Habitantes"
  );
  actualizarTextoElemento(
    "#caracteristicas-principales-gini",
    paisSeleccionado.giniPais
  );
  //fin seccion caracteristicas-principales
  actualizarTextoElemento(
    "#caracteristicas-secundarias-capital",
    paisSeleccionado.capitalPais
  );
  actualizarTextoElemento(
    "#caracteristicas-secundarias-subregion",
    paisSeleccionado.subregionPais
  );
  actualizarTextoElemento(
    "#caracteristicas-secundarias-independiente",
    paisSeleccionado.independientePais
  );
  actualizarTextoElemento(
    "#caracteristicas-secundarias-zonaHoraria",
    paisSeleccionado.zonaHorariaPais.join(", ")
  );
  actualizarTextoElemento(
    "#caracteristicas-secundarias-coordenadas",
    paisSeleccionado.coordenadasPais
  );
  actualizarEnlaceElemento(
    "#caracteristicas-secundarias-mapa",
    paisSeleccionado.mapaPais
  );

  const posicionAreaPais = calcularPosicionPaisPorPropiedad(
    estado.dataPaisesActual,
    "areaPais",
    paisSeleccionado.nombrePais
  );
  const posicionPoblacionPais = calcularPosicionPaisPorPropiedad(
    estado.dataPaisesActual,
    "poblacionPais",
    paisSeleccionado.nombrePais
  );

  const hasGini = paisSeleccionado.giniPais

  const posicionGiniPais = hasGini 
    ? calcularPosicionPaisPorGini(
        estado.dataPaisesActual,
        "giniPais",
        paisSeleccionado.nombrePais
      ) + "°"
    : "?";
  actualizarTextoElemento(
    "#caracteristicas-posicion-area",
    posicionAreaPais + "°"
  );
  actualizarTextoElemento(
    "#caracteristicas-posicion-poblacion",
    posicionPoblacionPais + "°"
  );
  actualizarTextoElemento("#caracteristicas-posicion-gini", posicionGiniPais);
  setCountry(paisSeleccionado.nombrePais)
}

renderizarBlog(estado);

function actualizarTextoElemento(elemento, texto) {
  const elementoSeleccionado = document.querySelector(`${elemento}`);
  if (texto) {
    elementoSeleccionado.textContent = texto.toLocaleString("en-US");
  } else {
    elementoSeleccionado.textContent = " Sin informacion";
  }
}

function actualizarSrcAltImagen(elemento, src, alt) {
  const elementoSeleccionado = document.querySelector(`${elemento}`);
  if (src) {
    elementoSeleccionado.src = src;
    elementoSeleccionado.alt = alt || "sin informacion para mostrar";
  } else {
    elementoSeleccionado.src = "https://via.placeholder.com/150";
    elementoSeleccionado.alt = "sin escudo";
  }
  renderizarPaisesRandom(estado);
}
function actualizarEnlaceElemento(elemento, enlace) {
  const elementoSeleccionado = document.querySelector(`${elemento}`);
  elementoSeleccionado.href = enlace;
}

function renderizarPaisesRandom(estado) {
  const listaPaisesRandom = document.querySelectorAll(
    "#lista-paises-random li"
  );
  listaPaisesRandom.forEach((li) => {
    const indiceRandom = Math.round(
      Math.random() * estado.dataPaisesActual.length
    );
    const paisRandom = estado.dataPaisesActual[indiceRandom];
    li.dataset.paisSeleccionado = paisRandom.nombrePais;
    li.addEventListener("click", () => {
      alternarBlogPaisRandom(estado, indiceRandom);
    });
    li.querySelector("img").src = paisRandom.srcBanderaPais;
    li.querySelector("h6").textContent = paisRandom.nombrePais;
  });
}

function calcularPosicionPaisPorPropiedad(
  dataPaises,
  propiedad,
  nombreDelPais
) {
  const paises = [...dataPaises];
  const paisesOrdenadosPropiedad = paises.sort(
    (a, b) => b[propiedad] - a[propiedad]
  );

  const posicionPais = paisesOrdenadosPropiedad.findIndex(
    (pais) => pais.nombrePais === nombreDelPais
  );

  return posicionPais + 1;

}
function calcularPosicionPaisPorGini(dataPaises, propiedad, nombreDelPais) {
  const paises = [...dataPaises];
  const paisesConGini = paises.filter((pais) => pais.giniPais);
  const paisesOrdenadosPropiedad = paisesConGini.sort(
    (a, b) => a[propiedad] - b[propiedad]
  );
  const posicionPais = paisesOrdenadosPropiedad.findIndex(
    (pais) => pais.nombrePais === nombreDelPais
  );
  return posicionPais + 1;
}

function alternarBlogPaisRandom(estado, indice) {
  estado.dataPaisesActual.forEach((pais) => (pais.blogPais = false));
  estado.dataPaisesActual[indice].blogPais = true;
  localStorage.setItem("estado", JSON.stringify(estado));
}

//Se uso chatGPT para esta funcion 
//le agrega a la url el parametro del pais
function setCountry(country) {
  const url = new URL(window.location.href);
  url.searchParams.set('pais', country);
  window.history.pushState({}, '', url)
}