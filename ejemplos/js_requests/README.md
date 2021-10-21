# Enviar requests a Django usando Javascript
En este ejemplo veremos distintas formas de comunicarnos desde Javascript hacia Django, de forma que podamos enviar data de forma más libre que usando solo los formularios que vimos en clases.

Para clonar este repo debes ir a [la raíz del proyecto](https://github.com/Aux-Ing-1/Ejemplos).

## Javascript vs Django
Es importante en este punto entender que una página web corre en dos lugares: el servidor/backend (nuestro computador corriendo Python) y el cliente/frontend (el browser de el/la usuario/a corriendo Javascript). Todo lo que ocurre en Javascript está pasando localmente en el computador cliente, por lo que desde el servidor no tenemos acceso a ello directamente. Para poder comunicar el front con el back, es necesario enviar una **request**, usualmente de tipo POST, y eso es lo que hemos estado haciendo al enviar un formulario. En este ejemplo veremos cómo enviar estas requests desde el frontend con Javascript.

Javascript es un lenguaje de programación similar a otros que conoces, como Python, Java, C, etc. Es bastante flexible en cuanto a sintaxis y estándares (a diferencia de Java, por ejemplo), pero a nivel básico se maneja de manera similar a los demás (variables, funciones, operaciones `if`, `for`, `while`, etc). Su característica principal es que corre en el navegador del cliente y permite manipular el DOM (estructura del HTML). En el siguiente enlace puedes ver un resumen ejemplificado de la sintaxis y funciones básicas de JS:

[W3Schools: Javascript Examples](https://www.w3schools.com/js/js_examples.asp)

## Estructura del ejemplo
En esta app tenemos los siguientes archivos relevantes:
- `static/js_requests/js/requests_script.js`: Contiene los scripts de Javascript, donde ocurre el núcleo de este ejemplo.
- `templates/js_requests/requests_template.html`: El template o página HTML que renderea la interfaz del ejemplo. Observar al final del template cómo se hace el enlace entre con el `.js`
- `models.py`: Define un solo modelo, `TextData`, que nos servirá para guardar y mostrar la info que enviemos.
- `views.py`: Define una única view sencilla que renderea el template en caso de GET, y guarda un item nuevo en caso de POST.
- `urls.py`: Define una única URL para la interfaz: `/js/requests`.

Para utilizar el ejemplo corre el servidor e ingresa a la URL `127.0.0.1:8000/js/requests`.

## Explicación
Te explicaremos 4 formas distintas de hacer esto, cada una tiene sus pros y contras. La mejor solución dependerá netamente del contexto y necesidades, por lo que es buena idea conocerlas todas.

### Formularios básicos
La primera forma de enviar data es la que ya conocemos de las clases auxiliares. Crear un `<form method="POST">` en el HTML que tenga un `<button type="submit">` dentro. De esta forma no estamos usando Javascript directamente, sino que el browser se encarga de enviar la request con la data que consiga del formulario.

Esto se ejemplifica en la primera parte del template, donde está el form con `id="my-data-form"`, y se activa con el primer botón de la interfaz.

### Formulario enviado mediante Javascript
En la solución anterior, es necesario que el botón esté dentro del formulario, pero usando Javascript podemos activar el `submit` desde cualquier parte. Para esto, observamos en `requests_script.js` la función:
```js
function sendWithJSSubmit() {
    const form = document.getElementById("my-data-form");
    form.submit();
}
```
Es sencillo ver que estamos seleccionando el elemento HTML que tiene `id="my-data-form"`. Luego, llamamos la función `submit()` de ese elemento, lo que es equivalente a presionar un `<button type="submit">`.

En el template, vemos que el segundo botón tiene los atributos `type="button" onclick="sendWithJSSubmit()"`. Esto hará que al clickear el botón se llame a esta función que encontrará el form por su ID y lo enviará. De esta forma, el botón queda desasociado del form y podría estar en cualquier parte de este template.

### Formularios ocultos para enviar data arbitraria
Las dos opciones anteriores nos limitan a enviar data que sea ingresada por el usuario en los forms. Si queremos, por ejemplo, generar un número aleatorio por el lado del cliente (Javascript) y enviarlo al servidor, no podríamos hacerlo directamente con un formulario típico. Para esto, una opción es utilizar forms ocultos que podamos rellenar desde JS y luego hacerles submit como ya vimos. La ventaja de esto es que usamos el sistema que ya conocemos y no tendremos problemas por tecnicidades o por el token CSRF (más info al final).

Observamos la segunda parte de la interfaz. En el template tenemos un `<form hidden ...>` que dentro tiene un `<input type="hidden">`. Esto no se mostrará en la interfaz. Debajo tenemos un botón que llama la siguiente función:
```js
let generatedNumber = 0  // Variable global

function generateNumber() {
    generatedNumber = Math.floor(Math.random()*100000)  // Generar número y guardar en variable
    const numberElement = document.getElementById("my-random")  // Obtener elemento HTML
    numberElement.innerHTML = generatedNumber  // Llenar elemento HTML
}
```
Acá solamente estamos generando un número, lo guardamos como variable global del script y lo mostramos en un `<span>` en la interfaz. Esto podría ser cualquier otro proceso que requieran para su proyecto, como obtener coordenadas GPS, hacer cálculos específicos, etc.

La parte importante viene en la función que se llama con el botón de Enviar:
```js
function sendWithHiddenForm() {
    const hiddenForm = document.getElementById("my-hidden-form")
    const hiddenInput = document.getElementById("my-hidden-input")
    hiddenInput.value = generatedNumber
    hiddenForm.submit()
}
```
Aquí estamos obteniendo el formulario oculto y el input oculto. Luego simplemente llenamos nuestro input fantasma con la información que tenemos guardada y hacemos submit del formulario, como si hubiera sido llenado por el/la usuario/a.

### Enviar request asíncrona
Quizás habrás notado que al hacer un submit de un formulario la página necesariamente se recarga. De esta forma vuelve a cargar la view pero con método POST en vez de GET, para poder enviar la info. En una request _asíncrona_, esta recarga no es necesaria y el POST se envía paralelamente y espera una response, sin afectar la vista actual. Para esto usaremos la función `fetch()` de JS.

Este método también nos permite enviar información arbitraria programáticamente, y nos ahorra el uso de formularios fantasmas en el HTML. Por otro lado, complejiza un poco el lado técnico pues requiere hacer requests manuales, que no explicaremos en detalle por ahora. Tampoco es recomendable usar este método si se puede reemplazar por formularios simples, porque el código que genera podría ser progresivamente muy verboso.

Revisemos la función que invoca el botón "Enviar con fetch", en la parte superior de la interfaz:
```js
function sendWithFetch() {
    const inputText = document.getElementById("my-input");
    fetch("", {
        method: "POST",
        body: new URLSearchParams({ "text": inputText.value }),  // Aquí va la data
        headers: {
            "X-CSRFToken": csrf_token,
            "Content-Type": 'application/x-www-form-urlencoded; charset=utf-8'
        }
    }).then(res => {
        window.location.href = window.location.href  // "Truco" para recargar
    });
}
```
Igual que antes, obtenemos nuestro valor desde el input. Nota que este valor podría ser cualquier otra cosa, y no estar ligado al formulario o inputs.

El primer argumento de `fetch` es la URL a la que se va a enviar la request. En este caso es `""`, string vacío, para indicar que la request se hará sobre la misma URL en que estamos (`/js/requests/`). El segundo argumento recibe los parámetros y headers de la request. Lo que debemos ver acá es:
- Definimos que el método es POST.
- Enviamos el cuerpo de la request con nuestra data en forma de diccionario codificado.
- Enviamos el token CSRF para que el servidor no nos bloquee.
- Lo que está dentro del `then` ocurrirá al recibir un response. En este caso recargamos la página manualmente, para refrescar la data. Si no recargáramos, el item nuevo igualmente se crearía en la base de datos, pero no lo veríamos hasta la próxima carga, ya que al ser asíncrono la view no ha sido invocada de nuevo.

PD: Para poder usar `csrf_token` acá, es necesario pasarlo desde el template con la línea que está cerca del final del HTML:
```html
<script>csrf_token = '{{ csrf_token }}'</script>
```

## Otros
### Token CSRF
El Cross Site Request Forgery o CSRF es un tipo de ataque en el que la parte atacante genera requests hacia tu sitio desde otro sitio, pudiendo hacer que un/a usuario/a despistado/a genere acciones indeseadas. Por ejemplo, presionar un botón en el sitio malicioso que envía una request a tu servidor solicitando un cambio de e-mail, de la misma forma que usamos `fetch` más arriba para enviar POSTs. El browser automáticamente agregará la cookie de sesión de usuario/a a la request y el servidor la aceptará y cambiará la data a voluntad de la persona atacante.

Para evitar esto, cada vez que cargamos una página, Django envía al cliente un token generado aleatoriamente. Luego, cualquier request que se solicite requerirá que se envíe este mismo token de vuelta. De esta forma, se asegura que todas las requests vengan desde el propio sitio y no uno ajeno (Cross-Site Request). Así, se dificulta enormemente que un ataque consiga la sesión y además el token CSRF de un/a usuario/a, dando mayor seguridad de que todas las requests vendrán desde nuestro propio sitio.

Dado todo esto, cada vez que enviamos un form o request es necesario incluir este token. De hecho, al usar `{% csrf_token %}` dentro de un `<form>` en nuestro template, lo que el template hace es agregar un input invisible con `name="csrfmiddlewaretoken"` y `value=<nuestro-token>`, para que se envíe junto con el form, similar a como aprendimos recién.

Al final de este ejemplo pasamos el token como variable global al script de JS por ser más sencillo, pero una forma más segura[?] de obtenerlo sería a través de las cookies.
