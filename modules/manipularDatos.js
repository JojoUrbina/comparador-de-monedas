export function actualizarTarifas(dataPaisesActual, tarifas) {
  for (const pais of dataPaisesActual) {
    pais.tarifaPais = tarifas[pais.divisaPais];
  }
}
export function actualizarImportes(dataPaisesActual) {
  const monto = +document.querySelector("input#monto").value || 1;
  for (const pais of dataPaisesActual) {
    //se podria desarrollar la funcion para que muestre dependiendo de la cantidad ,solo 2 decimales
    pais.importePais = Number((pais.tarifaPais * monto).toFixed(3));
  }
}
export function crearDatosPrincipales(datos, tarifas) {
  const datosProcesados = [...datos];
  const datosPrincipales = datosProcesados.map((pais) => {
    const { currencies, translations, languages, flags, region } = pais;
    return {
      nombrePais: translations.spa.common,
       // se puede manipular para enviar la cantidad de idiomas que se quiera .slice(0,3).join(", ")
      lenguajePais: Object.values(languages).slice(0, 3),
      monedaPais: currencies[Object.keys(currencies)[0]].name,
      simboloMonedaPais:
        currencies[Object.keys(currencies)[0]].symbol?.replace(/\s/g, "") ||
        "$",
      srcBanderaPais: flags.png,
      altBanderaPais: flags.alt,
      regionPais:region,
      divisaPais: Object.keys(currencies)[1] || Object.keys(currencies)[0],
      tarifaPais: Number(
        tarifas[Object.keys(currencies)[1]] ||
          tarifas[Object.keys(currencies)[0]]
      ),
      importePais: Number(
        (
          tarifas[Object.keys(currencies)[1]] ||
          tarifas[Object.keys(currencies)[0]]
        ).toFixed(3)
      ),
      ordenDatos: null,
    };
  });
  return datosPrincipales;
}
