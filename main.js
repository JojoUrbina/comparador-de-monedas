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
  filtrarPaisesPorCategoria,
} from "./modules/funcionesFiltrar.js";
import {
  configurarEventosDeFiltro,
  configurarEventosDeOrdenar,
} from "./modules/configurarEventListener.js";

document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

export const estado = {
  dataPaisesPorDefecto: [],
  dataPaisesFiltrados: null,
  dataPaisesActual: [],
  dataPaisesFavoritos: [],
};

async function iniciarApp() {
  const paises = await fetchPaises();
  const tarifas = await fetchTarifas();
  const paisesConTarifa = filtrarPaisesConTarifa(paises, tarifas);

  estado.dataPaisesPorDefecto = crearDatosPrincipales(paisesConTarifa, tarifas);
  estado.dataPaisesActual = [...estado.dataPaisesPorDefecto]; // aca le puedo enviar el localStorage

  renderizarTabla(estado.dataPaisesPorDefecto);
  renderizarOpcionesSelect(estado.dataPaisesPorDefecto);

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
  actualizarPlaceholder();
  ejecutarLosEventListener();
}

function ejecutarLosEventListener() {
  document.querySelector("input#monto").addEventListener("input", (e) => {
    actualizarImportes(estado.dataPaisesActual);
    renderizarTabla(estado.dataPaisesActual);
  });

  document
    .querySelector("#seleccionarPais")
    .addEventListener("change", async (e) => {
      actualizarPlaceholder();

      const tarifaSeleccionada = e.target.value;
      const tarifas = await fetchTarifas(tarifaSeleccionada);

      actualizarTarifas(estado.dataPaisesActual, tarifas);
      actualizarImportes(estado.dataPaisesActual);
      renderizarTabla(estado.dataPaisesActual);
    });

  configurarEventosDeOrdenar(".ordenar-importe", ordenarDatosPorImporte);
  configurarEventosDeOrdenar(".ordenar-divisa", ordenarDatosPorDivisa);
  configurarEventosDeOrdenar(".ordenar-pais", ordenarDatosPorPais);
  configurarEventosDeOrdenar(".ordenar-lenguaje", ordenarDatosPorLenguaje);

  configurarEventosDeFiltro("lenguajes", "lenguajePais");
  configurarEventosDeFiltro("monedas", "monedaPais");
  configurarEventosDeFiltro("region", "regionPais");

  document
    .querySelector("#btn-reiniciar-filtros")
    .addEventListener("click", () => {
      estado.dataPaisesFiltrados = null;
      renderizarTabla(estado.dataPaisesActual);
    });

  document.querySelector("tbody").addEventListener("click", (e) => {
    const btnValor = e.srcElement.dataset.btnValor;
    if (btnValor) {
      const index = estado.dataPaisesActual.findIndex(
        (pais) => pais.nombrePais === btnValor
      );

      if (index !== -1) {
        estado.dataPaisesActual[index].paisFavorito
          ? (estado.dataPaisesActual[index].paisFavorito = false)
          : (estado.dataPaisesActual[index].paisFavorito = true);

        renderizarTabla(estado.dataPaisesActual);
      }
    }
  });
}
