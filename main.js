import { fetchPaises, fetchTarifas } from "./modules/fetch.js";
import {
  actualizarImportes,
  actualizarTarifas,
  crearDatosPrincipales,
} from "./modules/manipularDatos.js";
import {
  renderizarOpcionesSelect,
  renderizarTabla,
  actualizarPlaceholder,
  renderizarFiltros,
} from "./modules/funcionesRenderizar.js";
import {
  ordenarDatosPorImporte,
  ordenarDatosPorDivisa,
  ordenarDatosPorPais,
  ordenarDatosPorLenguaje,
} from "./modules/funcionesOrdenar.js";
import {
  filtrarPaisesConTarifa,
  extraerContarYOrdenarPropiedad,
} from "./modules/funcionesFiltrar.js";
import {
  configurarEventosDeFiltro,
  configurarEventosDeOrdenar,
  alternarFavorito,
  alternarBlogPais,
} from "./modules/configurarEventListener.js";
import { actualizarTablaYPaginacion } from "./modules/paginacion.js";

document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

const nombreEstadoActual = "estado";
export const estado = {
  dataPaisesPorDefecto: [],
  dataPaisesFiltrados: null,
  dataPaisesActual: [],
  dataPaisesFavoritos: [],
  dataTrivia: {
    respuestas: [],
  },
  paginaActual: 1,
  dataOrdenada: null,
};

async function iniciarApp() {
  const paises = await fetchPaises();
  const tarifas = await fetchTarifas("EUR");
  const paisesConTarifa = filtrarPaisesConTarifa(paises, tarifas);

  estado.dataPaisesPorDefecto = crearDatosPrincipales(paisesConTarifa, tarifas);
  estado.dataPaisesActual = JSON.parse(localStorage.getItem(nombreEstadoActual))
    ?.dataPaisesActual || [...estado.dataPaisesPorDefecto];

  //Para eliminar los estados de los usuarios que probaron la aplicacion antes de la versión final
  localStorage.removeItem("estado1");
  localStorage.removeItem("estado2");
  localStorage.removeItem("estado3");

  actualizarTarifas(estado.dataPaisesActual, tarifas);
  actualizarImportes(estado.dataPaisesActual);
  //renderizarTabla(estado.dataPaisesActual);
  actualizarTablaYPaginacion();
  actualizarPlaceholder();
  RenderizarIUYconfigurarEventos();
}

function RenderizarIUYconfigurarEventos() {
  renderizarOpcionesSelect(estado.dataPaisesActual);

  renderizarFiltros(
    "lenguajes",
    extraerContarYOrdenarPropiedad(estado.dataPaisesActual, "lenguajePais")
  );
  renderizarFiltros(
    "monedas",
    extraerContarYOrdenarPropiedad(estado.dataPaisesActual, "monedaPais")
  );

  renderizarFiltros(
    "region",
    extraerContarYOrdenarPropiedad(estado.dataPaisesActual, "regionPais")
  );
  document.querySelector("input#monto").addEventListener("input", (e) => {
    actualizarImportes(estado.dataPaisesActual);
    //renderizarTabla(estado.dataPaisesFiltrados || estado.dataPaisesActual);
    actualizarTablaYPaginacion();
  });

  document
    .querySelector("#seleccionarPais")
    .addEventListener("change", async (e) => {
      actualizarPlaceholder();

      const tarifaSeleccionada = e.target.value;
      const tarifas = await fetchTarifas(tarifaSeleccionada);

      actualizarTarifas(estado.dataPaisesActual, tarifas);
      actualizarImportes(estado.dataPaisesActual);
      //renderizarTabla(estado.dataPaisesFiltrados || estado.dataPaisesActual);
      estado.paginaActual = 1;
      estado.dataOrdenada = null;
      estado.dataPaisesFiltrados = paisFiltrado;
      actualizarTablaYPaginacion();
    });

  document.querySelector("tbody").addEventListener("click", alternarFavorito);
  document.querySelector("tbody").addEventListener("click", alternarBlogPais);

  document
    .querySelector("#btn-filtro-favoritos")
    .addEventListener("click", () => {
      estado.dataPaisesFavoritos = estado.dataPaisesActual.filter(
        (pais) => pais.paisFavorito === true
      );
      estado.dataPaisesFiltrados = [...estado.dataPaisesFavoritos];
      estado.dataOrdenada = null;
      estado.paginaActual = 1;
      actualizarTablaYPaginacion();
    });

  document
    .querySelector("#btn-reiniciar-filtros")
    .addEventListener("click", () => {
      estado.dataPaisesFiltrados = null;
      estado.dataOrdenada = null;
      estado.paginaActual = 1;
      document.querySelector("#input-buscar").value = "";
      actualizarTablaYPaginacion();
    });

  configurarEventosDeOrdenar(".ordenar-importe", ordenarDatosPorImporte);
  configurarEventosDeOrdenar(".ordenar-divisa", ordenarDatosPorDivisa);
  configurarEventosDeOrdenar(".ordenar-pais", ordenarDatosPorPais);
  configurarEventosDeOrdenar(".ordenar-lenguaje", ordenarDatosPorLenguaje);

  configurarEventosDeFiltro("lenguajes", "lenguajePais");
  configurarEventosDeFiltro("monedas", "monedaPais");
  configurarEventosDeFiltro("region", "regionPais");

  document.querySelector("#input-buscar").addEventListener("input", (e) => {
    e.preventDefault();
    const inputValue = e.target.value;

    const paisFiltrado = estado.dataPaisesActual.filter((pais) =>
      eliminarAcentos(pais.nombrePais.toLowerCase()).includes(
        eliminarAcentos(inputValue.toLowerCase())
      )
    );

    estado.paginaActual = 1;
    estado.dataOrdenada = null;
    estado.dataPaisesFiltrados = paisFiltrado;
    actualizarTablaYPaginacion();
  });
  document.querySelector("#input-buscar").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
  document.body.addEventListener("click", () => {
    localStorage.setItem(nombreEstadoActual, JSON.stringify(estado));
  });
}
const eliminarAcentos = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
