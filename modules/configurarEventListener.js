import { filtrarPaisesPorCategoria } from "./funcionesFiltrar.js";
import { renderizarTabla } from "./funcionesRenderizar.js";
import { estado } from "../main.js";
export function configurarEventosDeFiltro(
  categoria,
  propiedadPais
) {
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
      if (estado.dataPaisesFiltrados) {
        renderizarTabla(funcionOrdenar(estado.dataPaisesFiltrados));
      } else {
        renderizarTabla(funcionOrdenar(estado.dataPaisesActual));
      }
    });
  }

  export   function configurarEfectoHoverEnEstrellas() {
    const filas = document.querySelectorAll("tbody tr");
    filas
      .forEach((fila) => {
        fila.addEventListener("mouseover", () => {
          const celdasEstrella = fila.querySelector("td");
          const estrella = celdasEstrella.querySelector("svg")
          estrella.classList.add("estrella-opaca");
        });
        fila.addEventListener("mouseout", () => {
          const celdasEstrella = fila.querySelector("td");
          const estrella = celdasEstrella.querySelector("svg")
          estrella.classList.remove("estrella-opaca");
        });
      })
  }