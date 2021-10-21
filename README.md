# Ejemplos básicos de Django
La idea de este repositorio es tener una biblioteca de proyectos muy minimalistas con lo mínimo necesario para demostrar cosas que no hemos visto en clases, o ahondar en las que sí. De esta forma generamos referencias para que cada equipo pueda consultar según las necesidades de su proyecto y podamos facilitarles un poco la búsqueda de información en internet. Se irán agregando ejemplos a medida que los vayan requiriendo, así que no tengan miedo de preguntar y pedir ayuda c:

Todo el repo es un proyecto de Django y cada ejemplo es una _app_ del mismo. Para correr el proyecto debemos hacer el procedimiento visto en clases:
- Clonar repo en local.
- Crear y activar un ambiente virtual.
- `pip install -r requirements.txt`
- `python manage.py makemigrations`
- `python manage.py migrate`
- `python manage.py runserver`
- 
Si tienes dudas sobre esto, consulta las actividades de las auxiliares.

## Ejemplos disponibles
- [Requests a Django usando Javascript](https://github.com/Aux-Ing-1/Ejemplos/tree/master/ejemplos/js_requests). Cómo enviar data desde el cliente/frontend/Javascript hacia el servidor/backend/Django de forma más compleja que los formularios de las auxiliares.
- [Geolocalización usando Javascript](https://github.com/Aux-Ing-1/Ejemplos/tree/master/ejemplos/js_geolocation). Cómo solicitar las coordenadas del dispositivo con Javascript y enviarlas al servidor.
