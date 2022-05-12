# Ordenar datos de una tabla usando Javascript
En este ejemplo veremos **dos formas** de ordenar datos en una tabla ¡Y de forma dinámica utilizando Javascript! Esto significa que no tendremos que pedirle al servidor que nos envíe nuevamente la información en un orden determinado.

Planteamos dos ejemplos: una forma utilizará un código hecho "a mano" por sus gentiles auxiliares (en realidad lo sacamos de una página web), y para la otra forma utilizaremos un framework (DataTables) que agrega mayor usabilidad a la tabla, como flechas que indican el orden (ascendente o descendente) de los valores, buscadores, paginamiento, ¡y más!

Para clonar este repo debes ir a [la raíz del proyecto](https://github.com/Aux-Ing-1/Ejemplos).

## Sin framework
¿Cuáles son las ventajas?
- Permite mayor personalización.

¿Cuáñes son las desventajas?
- Toma tiempo programando y es algo que probablemente alguien ya implementó.
- El código no es simple de entender.
- Si el código es ineficiente, puede repercutir en el consumo de recursos del cliente.

La implementación del código en Javascript está inspirado (y bastante copiado) de la siguiente página: [W3Schools: How To - Sort a Table](https://www.w3schools.com/howto/howto_js_sort_table.asp)

Para utilizar el ejemplo corre el servidor e ingresa a la URL `localhost:8000/js/tables/pure_javascript`. Para ordenar los datos de la tabla debes presionar sobre el header de cada columna.


## Con framework DataTables
¿Cuáles son las ventajas?
- Fácil de usar e instalar en su página web.
- No requiere mucho trabajo.

¿Cuáles son las desventajas?
- Se hace más difícil su customización.

La documentación de este framework se encuentra en el siguiente enlace: [DataTables](datatables.net)

Para utilizar el ejemplo corre el servidor e ingresa a la URL `localhost:8000/js/tables/framework`


## Estructura del ejemplo
En esta app tenemos los siguientes archivos relevantes que estructuran el ejemplo:

### Sin framework
- `static/js_tables/js/tables_script_javascript.js`: Contiene los métodos que permiten la ordenación de las filas en la tabla. 
- `templates/js_tables/tables_template_javascript.html`: Observar que al final del archivo se importa el script anterior. Si se importara antes, `document.getElementById("table");` retornaría null.

### Con framework
- `static/js_tables/js/tables_script_framework.js`: Contiene la llamada a una función cuando el documento esté en estado *ready* (lo que significa que el documento HTML se ha cargado completamente). En palabras simples, en este script se obtiene la tabla para convertirla en una DataTable. Este framework aplica cambios a la estructura del HTML y al estilo (de la tabla). Dentro de este script se pueden cambiar algunas configuraciones para agregarle (o quitarle) algunas funcionalidades a la tabla (paginamiento, búsqueda, entre otros).
- `templates/js_tables/tables_template_framework.html`: Lo importante en este archivo es enlazar los framework's y las hojas de estilos, junto con el script anterior. Además, a cada "table header" se le debe asignar el parámetro `onclick="sortTable(n)`, con `n` el índice de la columna.

### Para ambas formas
- `models.py`: Define un solo modelo, `Movie`, que nos servirá para guardar y mostrar la info que enviemos.
- `views.py`: Define dos vistas sencillas que renderea el template en caso de GET.
- `urls.py`: Define dos URL's para las interfaces: `/js/tables/pure_javascript` y `/js/tables/framework`.