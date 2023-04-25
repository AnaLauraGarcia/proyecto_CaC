/* Se anteponen las variables del DOM con el signo $ */

const $d = document;
const $selectProvincia = $d.getElementById('selectProvincia');
const $selectMunicipio = $d.getElementById('selectMunicipio');
const $selectLocalidad = $d.getElementById('selectLocalidad');

function provincia() {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        let $options = `<option value="Seleccione una Provincia">Seleccione una Provincia</option>`;
        json.provincias.forEach(element => $options += `<option value="${element.nombre}">${element.nombre}</option>`);
        $selectProvincia.innerHTML = $options;
    })
    .catch(error => {
        let  message  = error.statusText || "Ocurrió un error"
        $selectProvincia.nextElementSibling.innerHTML = `Error: ${error.status}: ${message}`;
    })
}

$d.addEventListener("DOMContentLoaded", provincia);

function municipio(provincia) {
    fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&max=250`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        let $options = `<option value="Seleccione un Municipio">Seleccione un Municipio</option>`;
        json.municipios.forEach(element => $options += `<option value="${element.id}">${element.nombre}</option>`);
        $selectMunicipio.innerHTML = $options;
        $selectMunicipio.disabled = false;
        $selectMunicipio.style.cursor = 'pointer';
        if (json.cantidad == 0) {   /* si no tiene municipios se llama la funcion localidad_provincia para mostrar localidades */
            localidad_provincia(provincia);
            $selectMunicipio.disabled = true;
            $selectMunicipio.style.cursor = 'default';
        }
    })
    .catch(error => {
        let  message  = error.statusText || "Ocurrió un error"
        $selectMunicipio.nextElementSibling.innerHTML = `Error: ${error.status}: ${message}`;
    })
}

$selectProvincia.addEventListener("change", e => {
    municipio(e.target.value);
})

function localidad_provincia(provincia) {
    console.log(provincia);
    fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&max=500`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        let $options = `<option value="Seleccione una Localidad">Seleccione una Localidad</option>`;
        json.localidades.forEach(element => $options += `<option value="${element.id}">${element.nombre}</option>`);
        $selectLocalidad.innerHTML = $options;
    })
    .catch(error => {
        let  message  = error.statusText || "Ocurrió un error"
        $selectLocalidad.nextElementSibling.innerHTML = `Error: ${error.status}: ${message}`;
    })
}

function localidad(municipio) {
    fetch(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${municipio}&max=100`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        let $options = `<option value="Seleccione una Localidad">Seleccione una Localidad</option>`;
        json.localidades.forEach(element => $options += `<option value="${element.id}">${element.nombre}</option>`);
        $selectLocalidad.innerHTML = $options;
    })
    .catch(error => {
        let  message  = error.statusText || "Ocurrió un error"
        $selectLocalidad.nextElementSibling.innerHTML = `Error: ${error.status}: ${message}`;
    })
}

$selectMunicipio.addEventListener("change", e => {
    localidad(e.target.value);
})