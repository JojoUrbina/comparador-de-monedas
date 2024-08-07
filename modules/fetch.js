export async function fetchPaises() {
    const response = await fetch("./json/paises.json");
    const data = await response.json();
    return data;
  }
 export async function fetchTarifas(tarifa) {
  //En caso de querer hacer pruebas, no se enviara argumento para trabajar con el json local.
    const apiUrl = `https://open.er-api.com/v6/latest/${tarifa}`;
    const url = tarifa ? apiUrl : `./json/divisas.json`;
    const res = await fetch(url);
    const data = await res.json();
    const tarifas = data.rates;
    return tarifas;
  }