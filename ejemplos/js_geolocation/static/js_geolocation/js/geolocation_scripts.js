// Fuente: https://www.w3schools.com/html/html5_geolocation.asp

// Variables globales
const info = document.getElementById("info");
let latObtained, lonObtained;

// Función que solicita la localización al browser
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        info.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Callback que recibe como parámetro la posición obtenida
function showPosition(position) {
    // Guardar la data en una variable
    latObtained = position.coords.latitude;
    lonObtained = position.coords.longitude;

    // Mostrar la data en el HTML
    const latSpan = document.getElementById("lat-span");
    const lonSpan = document.getElementById("lon-span");
    latSpan.innerHTML = latObtained
    lonSpan.innerHTML = lonObtained
    // Actualizar el formulario falso
    const latInput = document.getElementById("lat-input");
    const lonInput = document.getElementById("lon-input");
    latInput.value = latObtained
    lonInput.value = lonObtained

    info.innerHTML = "Geolocation updated.";
}

// Callback que recibe información sobre el error, si ocurre
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            info.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            info.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            info.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            info.innerHTML = "An unknown error occurred."
            break;
    }
}

// Función que envía una request POST al server con la data usando el método de forms ocultos.
// Revisa el ejemplo de Requests Javascript en el repo de ejemplos para más info/opciones.
function saveLocation() {
    if (latObtained && lonObtained) {
        const form = document.getElementById("location-form");
        form.submit();
    
        info.innerHTML = "Geolocation saved."
    } else {
        info.innerHTML = "Obtain geolocation first."
    }
}