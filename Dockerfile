# --- Etapa 1: build ---
FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_API_URL=/api
ARG VITE_API_KEY=dev-api-key
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_KEY=$VITE_API_KEY

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Etapa 2: servir con nginx ---
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

ENV NGINX_BACKEND_URL=http://backend:3000

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
