import { estado } from "../main.js";
import { renderizarTabla  } from "./funcionesRenderizar.js";
const ELEMENTOS_POR_PAGINA = 10; // Número de elementos por página

function obtenerElementosPagina(data, pagina) {
  const inicio = (pagina - 1) * ELEMENTOS_POR_PAGINA;
  const fin = pagina * ELEMENTOS_POR_PAGINA;
  return data.slice(inicio, fin);
}

export function actualizarTablaYPaginacion(data) {
  const datos =
    estado.dataOrdenada ||
    data ||
    estado.dataPaisesFiltrados ||
    estado.dataPaisesActual;

  const datosPagina = obtenerElementosPagina(datos, estado.paginaActual);
  renderizarTabla(datosPagina);
  renderizarPaginacion(datos.length);
}
function renderizarPaginacion(totalElementos) {
  const totalPaginas = Math.ceil(totalElementos / ELEMENTOS_POR_PAGINA);
  const paginacion = document.querySelector("#paginacion");
  paginacion.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    const a = document.createElement("a");
    a.textContent = i;
    a.classList.add("page-link");
    if (i === estado.paginaActual) {
      a.classList.add("active");
    }
    a.addEventListener("click", () => {
      estado.paginaActual = i;
      actualizarTablaYPaginacion();
    });
    li.appendChild(a);
    paginacion.appendChild(li);
  }
}
