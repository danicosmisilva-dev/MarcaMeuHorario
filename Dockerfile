# Multi-stage Dockerfile for building and serving the Angular app without nginx
### Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first using package manifests to leverage cache
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy the rest of the project and build
COPY . .
RUN npm run build -- --configuration production

### Minimal runtime stage using a simple Node static server
FROM node:20-alpine
WORKDIR /app

# Lightweight static file server for the built assets
RUN npm install -g http-server@14

# Copy compiled app from the build stage
COPY --from=build /app/dist/marca-meu-horario ./dist

EXPOSE 8080
CMD ["http-server", "./dist", "-p", "8080", "-a", "0.0.0.0"]
