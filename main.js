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

document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

const estadoActual = "estado3";




export const estado = {
  dataPaisesPorDefecto: [],
  dataPaisesFiltrados: null,
  dataPaisesActual: [],
  dataPaisesFavoritos: [],
  dataTrivia: {
    respuestas: [],
    estadisticas:{ puntos: 0, maximoPuntaje: 0, contador: 0 }//borrar
  },
};

async function iniciarApp() {
  //const estadoAnterior= "estado1" //siempre se borra para comenzar de nuevo
  const paises = await fetchPaises();
  const tarifas = await fetchTarifas();
  const paisesConTarifa = filtrarPaisesConTarifa(paises, tarifas);

  estado.dataPaisesPorDefecto = crearDatosPrincipales(paisesConTarifa, tarifas);
  estado.dataPaisesActual = JSON.parse(localStorage.getItem(estadoActual))
    ?.dataPaisesActual || [...estado.dataPaisesPorDefecto];

  localStorage.removeItem("estado")
  localStorage.removeItem("estado1")


  actualizarTarifas(estado.dataPaisesActual, tarifas);
  actualizarImportes(estado.dataPaisesActual);
  renderizarTabla(estado.dataPaisesActual);
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
    renderizarTabla(estado.dataPaisesFiltrados || estado.dataPaisesActual);
  });

  document
    .querySelector("#seleccionarPais")
    .addEventListener("change", async (e) => {
      actualizarPlaceholder();

      const tarifaSeleccionada = e.target.value;
      const tarifas = await fetchTarifas(tarifaSeleccionada);

      actualizarTarifas(estado.dataPaisesActual, tarifas);
      actualizarImportes(estado.dataPaisesActual);
      renderizarTabla(estado.dataPaisesFiltrados || estado.dataPaisesActual);
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

      renderizarTabla(estado.dataPaisesFiltrados);
    });

  document
    .querySelector("#btn-reiniciar-filtros")
    .addEventListener("click", () => {
      estado.dataPaisesFiltrados = null;
      renderizarTabla(estado.dataPaisesActual);
    });

  document.body.addEventListener("click", () => {
    localStorage.setItem(estadoActual, JSON.stringify(estado));
  });

  configurarEventosDeOrdenar(".ordenar-importe", ordenarDatosPorImporte);
  configurarEventosDeOrdenar(".ordenar-divisa", ordenarDatosPorDivisa);
  configurarEventosDeOrdenar(".ordenar-pais", ordenarDatosPorPais);
  configurarEventosDeOrdenar(".ordenar-lenguaje", ordenarDatosPorLenguaje);

  configurarEventosDeFiltro("lenguajes", "lenguajePais");
  configurarEventosDeFiltro("monedas", "monedaPais");
  configurarEventosDeFiltro("region", "regionPais");
}
