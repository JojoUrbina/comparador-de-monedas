export function renderizarOpcionesSelect(data) {
  function ordenarPaisesPorOrdenAlfabetico(data) {
    const paisesConTarifaOrdenados = [...data];
    paisesConTarifaOrdenados.sort((a, b) => {
      if (a.nombrePais > b.nombrePais) {
        return 1;
      } else if (a.nombrePais < b.nombrePais) {
        return -1;
      } else {
        return 0;
      }
    });
    return paisesConTarifaOrdenados;
  }

  const paisesConTarifaOrdenados = ordenarPaisesPorOrdenAlfabetico(data);

  for (const {
    nombrePais,
    monedaPais,
    simboloMonedaPais,
    divisaPais,
  } of paisesConTarifaOrdenados) {
    const opcion = document.createElement("option");

    opcion.value = divisaPais;
    opcion.textContent = ` ${nombrePais} - ${monedaPais} - ${simboloMonedaPais} - ${divisaPais}`;
    opcion.classList.add(simboloMonedaPais);

    opcion.setAttribute("aria-label", monedaPais);
    seleccionarPais.appendChild(opcion);
  }
}

export function renderizarTabla(data) {
  const tbody = document.querySelector("tbody");
  const template = document.querySelector("#template-tabla-tr").content;
  const fragment = document.createDocumentFragment();

  tbody.innerHTML = "";
  for (const {
    nombrePais,
    lenguajePais,
    monedaPais,
    simboloMonedaPais,
    srcBanderaPais,
    altBanderaPais,
    divisaPais,
    importePais,
  } of data) {
    const filasClonadas = template.cloneNode(true);
    const celdasClonadas = filasClonadas.querySelectorAll("td");
    celdasClonadas[0].textContent = importePais + " " + simboloMonedaPais;
    celdasClonadas[0].classList.add(divisaPais);
    celdasClonadas[1].textContent = divisaPais;
    celdasClonadas[2].textContent = monedaPais;
    celdasClonadas[3].textContent = nombrePais;
    celdasClonadas[4].textContent = lenguajePais.join(", ");
    celdasClonadas[5].querySelector("img").src = srcBanderaPais;
    celdasClonadas[5].querySelector("img").alt = altBanderaPais;
    celdasClonadas[6].textContent = "ver mas";
    fragment.appendChild(filasClonadas);
  }
  tbody.appendChild(fragment);
}

export function renderizarFiltros(categoria, datos) {
  const template = document.querySelector("#template-filtros-ul").content;
  const fragment = document.createDocumentFragment();
  const divFiltro = document.querySelector(`#filtro-${categoria}`);

  for (const [dato, cantidad] of datos.slice(0, 6)) {
    //Se podria utilizar el valor de cantidad para añadir informacion extra
    const elementoUlClonado = template.cloneNode(true);
    const elementoAClonado = elementoUlClonado.querySelector("a");
    elementoAClonado.textContent = dato;
    elementoAClonado.dataset.btnValor = dato;
    elementoAClonado.classList.add(`btn-filtro-${categoria}`);

    //Para aplicar un efecto tipo hover
    elementoAClonado.addEventListener("mouseover", () => {
      if (categoria === "region") {
        elementoAClonado.textContent = `${dato} - Conformado por ${cantidad} países`;
      } else {
        elementoAClonado.textContent = `${dato} - Usado en ${cantidad} países`;
      }
    });

    elementoAClonado.addEventListener("mouseout", () => {
      elementoAClonado.textContent = dato;
    });
    //fin del efecto tipo hover

    fragment.appendChild(elementoUlClonado);
  }
  divFiltro.appendChild(fragment);
}

export function actualizarPlaceholder() {
  const seleccionarPais = document.querySelector("#seleccionarPais");
  const simboloInput = document.querySelector("#inputGroup-sizing-md");

  const monedaPlaceholder = seleccionarPais.selectedOptions[0].ariaLabel;
  const simboloPlaceholder = seleccionarPais.selectedOptions[0].className;

  const textoPlaceholder = `Escribir monto en ${monedaPlaceholder}`;

  document.querySelector("input#monto").placeholder = textoPlaceholder;
  simboloInput.textContent = simboloPlaceholder;
}
