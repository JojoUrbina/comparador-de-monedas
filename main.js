const inputMonto = document.querySelector("#monto");
const seleccionarPais = document.querySelector("#seleccionarPais");
const tbody = document.querySelector("tbody");
const template = document.querySelector("template").content;
const fragment = document.createDocumentFragment();
const simboloInput = document.querySelector("#inputGroup-sizing-md");
document.addEventListener("DOMContentLoaded", () => {
  cargarDatos();
});

const simboloInputInicial = "€";
const monedaInputInicial = "Euro";

let paisesConMoneda = [];
let tarifaActual = "EUR";
let montoActual = 1;

inputMonto.placeholder = `Escribir monto en ${monedaInputInicial}`;
simboloInput.textContent = simboloInputInicial;

inputMonto.addEventListener("input", (e) => {
  montoActual = Number(e.target.value);
  actualizarMontos(tarifaActual, montoActual);
});

seleccionarPais.addEventListener("change", (e) => {
  const moneda = seleccionarPais.selectedOptions[0].id;
  tarifaActual = e.target.value;
  simboloInput.textContent = seleccionarPais.selectedOptions[0].className;
  inputMonto.placeholder = `Escribir monto en ${moneda}`;

  actualizarMontos(tarifaActual, montoActual);
});
async function cargarDatos() {
  const data = await fetchPaises();
  paisesConMoneda = data.filter((pais) => pais.currencies);
  renderizarPaises(paisesConMoneda);
  renderizarOpcionesDePaisesSeleccionables(paisesConMoneda);
  actualizarMontos(tarifaActual);
}

async function fetchPaises() {
  const response = await fetch("paises.json");
  const data = await response.json();
  return data;
}
async function fetchTarifas(tarifaActual) {
  const res = await fetch(`https://open.er-api.com/v6/latest/${tarifaActual}`);
  const data = await res.json();
  const tarifas = data.rates;
  return tarifas;
}

async function actualizarMontos(tarifaSeleccionada, montoInput) {
  const tarifas = await fetchTarifas(tarifaSeleccionada);

  for (const tarifa in tarifas) {
    const celdasMonto = document.getElementsByClassName(`${tarifa}`);
    for (const celda of celdasMonto) {
      const simbolo = celda.classList[1];
      const monto = Math.min(tarifas[tarifa] * (montoInput || 1)).toFixed(2);
      celda.textContent = `${monto}  ${simbolo}`;
    }
  }
}

function renderizarPaises(data) {
  for (const { currencies, translations, languages, flags } of data) {
    const divisa = Object.keys(currencies)[1] || Object.keys(currencies)[0];
    const moneda = currencies[Object.keys(currencies)[0]].name;
    const pais = translations.spa.common;
    const lenguaje = Object.values(languages)[0];
    const srcBandera = flags.png;
    const altBandera = flags.alt;

    const filasClonadas = template.cloneNode(true);
    const celdasClonadas = filasClonadas.querySelectorAll("td");

    celdasClonadas[0].classList.replace("simbolo", filtrarSimbolo(currencies));
    celdasClonadas[0].classList.add(divisa);
    celdasClonadas[1].textContent = divisa;

    celdasClonadas[2].textContent = moneda;
    celdasClonadas[3].textContent = pais;
    celdasClonadas[4].textContent = lenguaje;
    celdasClonadas[5].querySelector("img").src = srcBandera;
    celdasClonadas[5].querySelector("img").alt = altBandera;
    celdasClonadas[6].textContent = "ver mas";
    fragment.appendChild(filasClonadas);
  }
  tbody.appendChild(fragment);
}

function renderizarOpcionesDePaisesSeleccionables(data) {
  data.sort((a, b) => {
    if (a.name.common > b.name.common) {
      return 1;
    } else if (a.name.common < b.name.common) {
      return -1;
    } else {
      return 0;
    }
  });

  for (const { currencies, translations } of data) {
    const divisa = Object.keys(currencies)[1] || Object.keys(currencies)[0];
    const pais = translations.spa.common;
    const opcion = document.createElement("option");
    const moneda = currencies[Object.keys(currencies)[0]].name;
    const simboloDivisa = filtrarSimbolo(currencies).replace(/\s/g, "");
    opcion.value = divisa;
    opcion.textContent = pais;
    opcion.classList.add(simboloDivisa);
    opcion.setAttribute("id", moneda);
    seleccionarPais.appendChild(opcion);
  }
}
function filtrarSimbolo(currencies) {
  if (currencies[Object.keys(currencies)]?.symbol) {
    return currencies[Object.keys(currencies)].symbol.replace(/\s/g, "");
  } else {
    return "$";
  }
}
