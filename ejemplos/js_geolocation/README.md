# Obtener geolocalización con Javascript.
_Explicación en proceso_

## Estructura del ejemplo
En esta app tenemos los siguientes archivos relevantes:
- `static/js_geolocation/js/geolocation_script.js`: Contiene los scripts de Javascript, donde ocurre el núcleo de este ejemplo.
- `templates/js_geolocation/geolocation_template.html`: El template o página HTML que renderea la interfaz del ejemplo. Observar al final del template cómo se hace el enlace con el `.js`
- `models.py`: Define un solo modelo, `Location`, que nos servirá para guardar y mostrar la info que enviemos.
- `views.py`: Define una única view sencilla que renderea el template en caso de GET, y guarda un item nuevo en caso de POST.
- `urls.py`: Define una única URL para la interfaz: `/js/geolocation`.

Para utilizar el ejemplo corre el servidor e ingresa a la URL `127.0.0.1:8000/js/geolocation`.
