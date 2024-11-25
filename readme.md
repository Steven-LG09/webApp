Intrucciones de instalación

Asumiendo que nodejs y npm están instalados y funcionando, A Continuación vamos a ejecutar el comando npm install -g react-native-cli en la consola.

La bandera -g significa que está instalando este paquete de manera global. (está disponible en todas partes y no solo en la carpeta actual). 

Finalmente el paquete a instalar que es react-native-cli

Una vez instalado terminado de ejecutar este comando podemos crear nuestro primer
proyecto.

En la terminal escribimos npx create-expo-app --template blank example

npx crea-expo-app: Este comando utiliza npx para ejecutar el paquete create-expo-app
que es una herramienta para crear nuevos proyectos de Expo.

--template blank: Indica que se debe utilizar la plantilla básica o vacía para crear el
proyecto. Es el punto de partida más sencillo sin configuraciones adicionales.

example: nombre que se le asignará al proyecto. Nombre de la carpeta

Ubicados en una terminal desde la carpeta en la cual ejecutamos el comando para instalar
el proyecto.

Ahora ubicados en la carpeta example podemos ejecutar el comando npm start para iniciar la
ejecución del proyecto.

Si se quiere evitar este proceso simplemente se entra en la pagina https://snack.expo.dev/ y se importa este repositorio, para asi ejecutarlo en la web.