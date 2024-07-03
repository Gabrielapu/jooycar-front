# Usa una imagen de Node.js como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu proyecto al directorio de trabajo del contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Compila la aplicación para producción
RUN npm run build

# Expone el puerto 8080 para que pueda ser accesible desde fuera del contenedor
EXPOSE 8080

# Comando para iniciar la aplicación cuando se ejecute el contenedor
CMD ["npm", "run", "dev"]