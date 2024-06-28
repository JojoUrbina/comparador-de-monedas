const estado = JSON.parse(localStorage.getItem("estado"));

function renderizarBlog(estado) {
  const paisSeleccionado =
    estado.dataPaisesActual.find((pais) => pais.blogPais) ||
    estado.dataPaisesActual[0];
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
    paisSeleccionado.areaPais.toLocaleString("en-US") + " km²"
  );
  actualizarTextoElemento(
    "#caracteristicas-principales-poblacion",
    paisSeleccionado.poblacionPais.toLocaleString("en-US") + " habitantes"
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
  console.log(paisSeleccionado.coordenadasPais);
  actualizarEnlaceElemento(
    "#caracteristicas-secundarias-mapa",
    paisSeleccionado.mapaPais
  );
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
    elementoSeleccionado.src = "...";
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
      alternarBlogPais(estado, indiceRandom);
    });
    li.querySelector("img").src = paisRandom.srcBanderaPais;
    li.querySelector("h6").textContent = paisRandom.nombrePais;
  });
}
function alternarBlogPais(estado, indice) {
  estado.dataPaisesActual.forEach((pais) => (pais.blogPais = false));
  estado.dataPaisesActual[indice].blogPais = true;
  localStorage.setItem("estado", JSON.stringify(estado))
}
