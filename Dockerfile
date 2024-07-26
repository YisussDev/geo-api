# Etapa de construcción
FROM node:18-alpine AS build-stage
WORKDIR /app

# Copia los archivos de configuración de npm y package.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine AS production-stage
WORKDIR /app

# Copia solo los archivos necesarios desde la etapa de construcción
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/package.json ./package.json
COPY --from=build-stage /app/src/public/certifieds ./src/public/certifieds

# Expon el puerto que usará la aplicación
EXPOSE 3002

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]