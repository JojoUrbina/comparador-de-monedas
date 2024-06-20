export function ordenarDatosPorImporte(dataPaises) {
  const datosOrdenados = [...dataPaises];
  const esOrdenadoImporteMenorMayor =
    dataPaises[0].ordenDatos === "importe-menor-mayor";
  if (esOrdenadoImporteMenorMayor) {
    datosOrdenados.sort((a, b) => b.importePais - a.importePais);
    datosOrdenados.forEach((pais) => (pais.ordenDatos = "importe-mayor-menor"));
  } else {
    datosOrdenados.sort((a, b) => a.importePais - b.importePais);
    datosOrdenados.forEach((pais) => (pais.ordenDatos = "importe-menor-mayor"));
  }
  return datosOrdenados;
}
export function ordenarDatosPorDivisa(dataPaises) {
  const datosOrdenados = [...dataPaises];
  const esOrdenadoDivisaAZ = dataPaises[0].ordenDatos === "divisa-a-z";
  if (esOrdenadoDivisaAZ) {
    datosOrdenados.sort((a, b) => {
      if (a.divisaPais > b.divisaPais) {
        return -1;
      } else if (a.divisaPais < b.divisaPais) {
        return 1;
      } else {
        return 0;
      }
    });
    datosOrdenados.forEach((pais) => (pais.ordenDatos = "divisa-z-a"));
  } else {
    datosOrdenados.sort((a, b) => {
      if (a.divisaPais > b.divisaPais) {
        return 1;
      } else if (a.divisaPais < b.divisaPais) {
        return -1;
      } else {
        return 0;
      }
    });
    datosOrdenados.forEach((pais) => (pais.ordenDatos = "divisa-a-z"));
  }

  return datosOrdenados;
}
export function ordenarDatosPorPais(dataPaises) {
  const datosOrdenados = [...dataPaises];
  const esOrdenadoPaisAZ = dataPaises[0].ordenDatos === "pais-a-z";
  if (esOrdenadoPaisAZ) {
    datosOrdenados.sort((a, b) => {
      if (a.nombrePais > b.nombrePais) {
        return -1;
      } else if (a.nombrePais < b.nombrePais) {
        return 1;
      } else {
        return 0;
      }
    });
    datosOrdenados.forEach((pais) => (pais.ordenDatos = "pais-z-a"));
  } else {
    datosOrdenados.sort((a, b) => {
      if (a.nombrePais > b.nombrePais) {
        return 1;
      } else if (a.nombrePais < b.nombrePais) {
        return -1;
      } else {
        return 0;
      }
    });
    datosOrdenados.forEach((pais) => (pais.ordenDatos = "pais-a-z"));
  }

  return datosOrdenados;
}
export function ordenarDatosPorLenguaje(dataPaises) {
  const datosOrdenados = [...dataPaises];
  const esOrdenadoLenguajeAZ = dataPaises[0].ordenDatos === "lenguaje-a-z";
  if (esOrdenadoLenguajeAZ) {
    datosOrdenados.sort((a, b) => {
      if (a.lenguajePais > b.lenguajePais) {
        return -1;
      } else if (a.lenguajePais < b.lenguajePais) {
        return 1;
      } else {
        return 0;
      }
    });
    datosOrdenados.forEach((pais) => (pais.ordenDatos = "lenguaje-z-a"));
  } else {
    datosOrdenados.sort((a, b) => {
      if (a.lenguajePais > b.lenguajePais) {
        return 1;
      } else if (a.lenguajePais < b.lenguajePais) {
        return -1;
      } else {
        return 0;
      }
    });
    datosOrdenados.forEach((pais) => (pais.ordenDatos = "lenguaje-a-z"));
  }
  return datosOrdenados;
}
