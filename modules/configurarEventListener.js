import { filtrarPaisesPorCategoria } from "./funcionesFiltrar.js";
import { renderizarTabla } from "./funcionesRenderizar.js";
import { estado } from "../main.js";

export function configurarEventosDeFiltro(categoria, propiedadPais) {
  document.querySelectorAll(`.btn-filtro-${categoria}`).forEach((btn) => {
    btn.addEventListener("click", () => {
      const dataSetValor = btn.dataset.btnValor;
      estado.dataPaisesFiltrados = filtrarPaisesPorCategoria(
        estado.dataPaisesActual,
        propiedadPais,
        dataSetValor
      );
      renderizarTabla(estado.dataPaisesFiltrados);
    });
  });
}
export function configurarEventosDeOrdenar(selector, funcionOrdenar) {
  document.querySelector(selector).addEventListener("click", () => {
    renderizarTabla(
      funcionOrdenar(estado.dataPaisesFiltrados || estado.dataPaisesActual)
    );
  });
}

export function configurarEfectoHoverEnEstrellas() {
  const filas = document.querySelectorAll("tbody tr");
  filas.forEach((fila) => {
    fila.addEventListener("mouseover", () => {
      const celdasEstrella = fila.querySelector("td");
      const estrella = celdasEstrella.querySelector("svg");
      estrella.classList.add("estrella-opaca");
    });
    fila.addEventListener("mouseout", () => {
      const celdasEstrella = fila.querySelector("td");
      const estrella = celdasEstrella.querySelector("svg");
      estrella.classList.remove("estrella-opaca");
    });
  });
}

export function alternarFavorito(e) {
  const btnDatasetValor = e.srcElement.dataset.btnValor;
  if (btnDatasetValor) {
    const index = estado.dataPaisesActual.findIndex(
      (pais) => pais.nombrePais === btnDatasetValor
    );

    if (index !== -1) {
      //cuando findIndex no encuentra el valor buscado devuelve -1.

      // para alternar entre true y false si el pais es favorito o no
      estado.dataPaisesActual[index].paisFavorito =
        !estado.dataPaisesActual[index].paisFavorito;

      //esto se puede colocar en el boton, para que me filtre solo los true
          estado.dataPaisesFavoritos = estado.dataPaisesActual.filter(
        (pais) => pais.paisFavorito === true
      )   

      renderizarTabla(estado.dataPaisesFiltrados || estado.dataPaisesActual);
    }
  }
}
