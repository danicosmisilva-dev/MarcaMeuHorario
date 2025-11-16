# Docker & Local Development

Quick commands to build and run the production image, and to run the project for development using the provided compose files.

- Build the Angular production bundle locally:

```bash
npm ci
npm run build -- --configuration production
# Output will be in `dist/marca-meu-horario` (used by the Docker image)
```

- Build the production Docker image (multi-stage Dockerfile included):

```bash
docker build -t marca-meu-horario:latest .
```

- Run the production image locally (serves on port 80 inside container):

```bash
docker run --rm -p 8080:80 marca-meu-horario:latest
# Then open http://localhost:8080
```

- Start using `docker-compose` (production compose):

```bash
docker-compose up --build -d
# Stops with: docker-compose down
```

- Development workflow using `docker-compose.dev.yml` (live-reload):

```bash
docker-compose -f docker-compose.dev.yml up --build
# This starts a container that runs `ng serve` and binds the source into the container
# Visit the printed dev server URL (usually http://localhost:4200)
```

Notes:
- The Dockerfile expects the built Angular output under `dist/marca-meu-horario`. If you change the Angular output path in `angular.json`, update the Dockerfile accordingly.
- If you prefer to build locally and let Docker only copy the `dist/` output, run the `npm run build -- --configuration production` step before `docker build`.
- The development compose uses a bind mount so you can edit files on the host and see live reload inside the container. If you run into permission or performance issues on Linux, consider running `npm start` locally instead of the dev compose.
