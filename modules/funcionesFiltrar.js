

export function filtrarPaisesConTarifa(paises, tarifas) {
  const paisesConCurrencies = paises.filter((pais) => pais.currencies);
  const paisesConTarifa = paisesConCurrencies.filter(
    (pais) =>
      tarifas[Object.keys(pais.currencies)[0]] ||
      tarifas[Object.keys(pais.currencies)[1]]
  );
  return paisesConTarifa;
}

//Funciones Para extraer datos y luego renderizar
export function extraerContarYOrdenarPropiedad(dataPaises, propiedad) {
  const propiedadesExtraidas = dataPaises.map(
    (pais) => pais[`${propiedad}`]
  );

  const conteoDePropiedadesObjeto = propiedadesExtraidas.reduce(
    (acc, propiedades) => {
      if (Array.isArray(propiedades)) {
        propiedades.forEach((propiedad) => {
          acc[propiedad] = (acc[propiedad] || 0) + 1;
        });
      } else {
        acc[propiedades] = (acc[propiedades] || 0) + 1;
      }
      return acc;
    },
    {}
  );
  //se convierte en array para iterarlo

  const conteoDePropiedadesArray = Object.entries(conteoDePropiedadesObjeto);
  //se ordena por cantidad que esta en la posicion [1]

  const propiedadesOrdenadasMasAmenosRepetidas = conteoDePropiedadesArray.sort(
    (a, b) => b[1] - a[1]
  );
  return propiedadesOrdenadasMasAmenosRepetidas;
}

export function filtrarPaisesPorCategoria(
  dataPaises,
  propiedaPais,
  filtroSeleccionado
) {
  const paisesFiltrados = dataPaises.filter((pais) => {
    return (
      pais[propiedaPais] === filtroSeleccionado ||
      pais[propiedaPais][0] === filtroSeleccionado ||
      pais[propiedaPais][1] === filtroSeleccionado ||
      pais[propiedaPais][2] === filtroSeleccionado
    );
  });

  return paisesFiltrados;
}
