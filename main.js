const templateRow = document.getElementById("template-row").content;
const tbody = document.querySelector("tbody");
const inputMonto = document.querySelector("#monto");
document.addEventListener("DOMContentLoaded", (e) => actualizarMontos());

function addCeldaAFila(text, tr, moneda, imagen) {
  const td = document.createElement("td");
  td.textContent = text;
  td.classList.add("py-2");
  if (moneda) {
    td.classList.add(moneda);
  }
  if (imagen) {
    const img = document.createElement("img");
    td.textContent = "";
    img.src = imagen;
    img.alt = text;
    img.classList.add("bandera");
    img.classList.add("img-thumbnail");

    td.appendChild(img);
    console.log("entro a img");
  }

  tr.appendChild(td);
}

async function actualizarMontos(monto) {
  const res = await fetch("divisas.json");
  const data = await res.json();
  const tarifas = data.rates;
  for (const tarifa in tarifas) {
    const $tdEuros = document.getElementsByClassName(`${tarifa}`);
    for (const elemento of $tdEuros) {
      elemento.textContent = parseFloat(
        (tarifas[tarifa] * (monto || 1)).toFixed(2)
      );
    }
  }
}

async function cargarDatos() {
  const res = await fetch("paises.json");
  const data = await res.json();
  const dataOrdenada = [...data].sort((a, b) => {
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  });

  for (const moneda of data) {
    if (moneda.currencies) {
      const tr = document.createElement("tr");
      addCeldaAFila(1, tr, Object.keys(moneda.currencies)[0]);
      addCeldaAFila(Object.keys(moneda.currencies)[0], tr);
      addCeldaAFila(moneda.name.common, tr);
      addCeldaAFila(Object.values(moneda.languages)[0], tr);

      addCeldaAFila(moneda.flags.alt, tr, "", moneda.flags.png);
      addCeldaAFila("ver mas", tr, "", "");
      tbody.appendChild(tr);
    } else {
      //console.log(moneda.name.common, "No tiene currencies");
    }
  }
  inputMonto.addEventListener("input", (e) => {
    const monto = Number(inputMonto.value);
    actualizarMontos(monto);
  });
}
cargarDatos();
