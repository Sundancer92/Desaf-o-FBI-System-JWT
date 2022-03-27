# Desafio-FBI-System-JWT

Servidor con Express que utilice JWT para la autorización de agentes que visiten las páginas restringidas.

Plantilla entregada para el ejercicio:

![imagen](https://user-images.githubusercontent.com/68036938/160290093-0056d849-cbe7-42d9-9ac4-cdc2895df2dd.png)

Requerimientos
1. Crear una ruta que autentique a un agente basado en sus credenciales y genera un
token con sus datos.
2. Al autenticar un agente, devolver un HTML que:
* Muestre el email del agente autorizado.
* Guarde un token en SessionStorage con un tiempo de expiración de 2 minutos.
* Disponibiliza un hiperenlace para redirigir al agente a una ruta restringida.
3. Crear una ruta restringida que devuelva un mensaje de Bienvenida con el correo del
agente autorizado, en caso contrario devolver un estado HTTP que indique que el
usuario no está autorizado y un mensaje que menciona la descripción del error.
