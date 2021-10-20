// Fuente: https://www.w3schools.com/html/html5_geolocation.asp

// ===== Submit con JS =====
function sendWithJSSubmit() {
    const form = document.getElementById("my-data-form");
    form.submit();
}

// ===== Request asíncrona con fetch =====
// Notar que necesitamos traer el csrf_token en el template,
// y que este método no está directamente relacionado al form, por lo que podría enviarse cualquier data en el body.
function sendWithFetch() {
    const inputText = document.getElementById("my-input");
    fetch("", {
        method: "POST",
        body: new URLSearchParams({ "text": inputText.value }),  // Aquí va la data
        headers: {
            "X-CSRFToken": csrf_token,
            "Content-Type": 'application/x-www-form-urlencoded; charset=utf-8'
        }
    }).then(res => {  // Esto ocurrirá al recibir la response. En este caso, recargamos la página para refrescar los datos.
        window.location.href = window.location.href
        // Si no recargamos, la base de datos igualmente va a crear el item nuevo, pero no lo veremos hasta la próxima recarga.
    });
}

// ===== Formularios ocultos =====
let generatedNumber = 0  // Variable global

function generateNumber() {
    generatedNumber = Math.floor(Math.random()*100000)  // Generar número y guardar en variable
    const numberElement = document.getElementById("my-random")  // Obtener elemento HTML
    numberElement.innerHTML = generatedNumber  // Llenar elemento HTML
}

function sendWithHiddenForm() {
    const hiddenForm = document.getElementById("my-hidden-form")
    const hiddenInput = document.getElementById("my-hidden-input")
    hiddenInput.value = generatedNumber
    hiddenForm.submit()
}