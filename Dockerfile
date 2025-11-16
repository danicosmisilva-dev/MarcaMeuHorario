# Multi-stage Dockerfile for building and serving the Angular app with nginx
### Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first using package manifests to leverage cache
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy the rest of the project and build
COPY . .
RUN npm run build -- --configuration production

### Production stage (nginx)
FROM nginx:1.23-alpine
LABEL org.opencontainers.image.source="https://github.com/danicosmisilva-dev/MarcaMeuHorario"

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled app from the build stage
COPY --from=build /app/dist/marca-meu-horario /usr/share/nginx/html

# Copy custom nginx configuration (SPA fallback)
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]
