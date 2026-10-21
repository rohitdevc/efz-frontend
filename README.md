# EFZ Frontend

The frontend application for the EFZ website, built with Next.js, React, TypeScript, and Tailwind CSS.

- **Live Website:** https://www.eonfreezone.com/
- **Repository:** [rohitdevc/efz-frontend](https://github.com/rohitdevc/efz-frontend)

## Overview

EFZ Frontend is a web application built with Next.js App Router. It uses reusable React components and API-backed content to render website pages, homepage sliders, banners, and metadata.

The application supports configurable API endpoints, asset paths, and base paths for deployment in different environments.

## Features

- **Dynamic Homepage:** Renders homepage content and sliders retrieved through application services.
- **Reusable Components:** Organizes page layouts and shared UI elements into dedicated component directories.
- **API Integration:** Retrieves website content and metadata from a configurable API domain.
- **Interactive UI:** Includes slider and image lightbox functionality.
- **Content Rendering:** Supports HTML content parsing and line-break formatting.
- **SEO Metadata:** Generates page metadata using reusable utilities.
- **Configurable Deployment:** Supports configurable base paths and asset prefixes.
- **Docker Support:** Includes Dockerfile and Docker Compose configuration for containerized deployment.
- **Analytics:** Includes Google Analytics integration.

## Technology Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 | React framework and routing |
| React 19 | User interface |
| TypeScript | Type-safe development |
| Tailwind CSS 4 | Styling |
| ESLint 9 | Code linting |
| Swiper | Sliders and carousels |
| React Icons | Icon library |
| Yet Another React Lightbox | Image lightbox |
| npm | Dependency management |
| Docker | Containerized deployment |

## Prerequisites

- Node.js 22 or a compatible version supported by the project
- npm
- Access to the required backend API
- Environment configuration for your target environment

The Dockerfile uses Node.js 22 Alpine.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rohitdevc/efz-frontend.git
cd efz-frontend
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Configure environment variables

Create a `.env` file in the project root and configure the values required by your development environment.

The Docker configuration references the following variables:

| Variable | Purpose |
| --- | --- |
| `API_DOMAIN_NAME` | Backend API domain |
| `NEXT_PUBLIC_PATH` | Public-facing application path configuration |
| `BASEPATH_PREFIX` | Next.js base path configuration |
| `ASSET_PREFIX` | Asset URL prefix |

Set each value according to your environment and the application's configuration requirements. Some values are supplied as Docker build arguments, so they may need to be available when building the image.

**Security:** Do not commit actual credentials, tokens, or private configuration values. Review how `FRONTEND_TOKEN_KEY` is used before deciding whether it can safely be exposed to client-side code.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:2977](http://localhost:2977) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server on port 2977. |
| `npm run build` | Creates an optimized production build. |
| `npm run start` | Starts the production server on port 2977. |
| `npm run lint` | Runs ESLint. |

## Project Structure

```text
efz-frontend/
├── .github/
│   └── workflows/       # GitHub Actions workflows
├── app/                 # Next.js routes and application layouts
├── components/          # Reusable UI and page components
├── lib/                 # API integrations and shared utilities
├── public/              # Static assets
├── types/               # TypeScript type definitions
├── Dockerfile           # Docker image build configuration
├── docker-compose.yml   # Docker Compose configuration
├── next.config.ts       # Next.js configuration
├── package.json         # Dependencies and npm scripts
├── package-lock.json    # Dependency lockfile
└── tsconfig.json        # TypeScript configuration
```

## Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

The application is configured to use port `2977` for these npm scripts.

## Docker Deployment

The repository includes a Dockerfile and Docker Compose configuration.

After configuring the required environment variables, build and start the application:

```bash
docker compose up --build -d
```

View the container logs:

```bash
docker compose logs -f efz-web
```

Stop the application:

```bash
docker compose down
```

Before deployment, verify the container's internal listening port, exposed port, and port mapping. These settings must agree for the application to be accessible.

## Code Quality

Run ESLint to check the project:

```bash
npm run lint
```

## Contributing

Before submitting changes:

1. Follow the existing project structure and coding conventions.
2. Run ESLint and verify the production build.
3. Test affected pages and API integrations.
4. Keep secrets and environment-specific configuration out of version control.

## License

No license information has been verified for this repository. Contact the repository owner for permission before redistributing or reusing project code.

---

Built with Next.js, React, TypeScript, and Tailwind CSS.
