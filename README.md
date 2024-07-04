# jooycar-front

url: https://jooycartest.netlify.app/

Este es un proyecto en Vue 3 para postular a un puesto de trabajo como
desarrollador front con VueJS

## Comando para instalar dependencias

```sh
npm install
```

### Comando para hacer correr o hacer funcionar el proyecto en local

```sh
npm run dev

```

### Comando para ejecutar test unitarios

```sh
npm run test:unit
```

Los comandos deben ejecutarse en la terminal, ubicandose en la
carpeta del proyecto

El endpoint proporcionado a veces falla y no devuelve datos. Para efectos
del test, agregue registros manualmente para que siempre muestre un dato.

Pero de todas formas, esta el código para hacer la peticion GET al backend

El primer registro de los 3 permite tener una mejor idea del funcionamiento
del boundingBox

# Instrucciones Docker 

Instalar docker en tu sistema operativo

## Construir la Imagen Docker estando en la carpeta de tu proyecto
docker build -t nombre-imagen

## Ejecutar el Contenedor Docker
docker run -p 8080:8080 nombre-imagen