# Sanity + Nuxt + Docker Strict Starter

A batteries-included starter for building content-driven apps with [Nuxt](https://nuxt.com/) and [Sanity](https://www.sanity.io/). Forked from the official [Sanity Nuxt Clean template](https://github.com/sanity-io/sanity-template-nuxt-clean) and upgraded with strict code quality standards, testing, containerized development, and CI/CD.

![Screenshot of Sanity Studio using Presentation Tool to do Visual Editing](./nuxt-sanity-preview.webp)

## What's Different From the Original Template?

This starter takes the official Sanity + Nuxt template and adds everything you'd set up yourself on a real project:

- **Biome** for fast linting and formatting (replaces ESLint + Prettier)
- **lint-staged** for running Biome only on staged files (fast pre-commit checks)
- **Vitest** for unit testing with Nuxt-aware test utilities and code coverage
- **Playwright** for end-to-end browser testing
- **Docker Compose** for one-command local development
- **Husky** git hooks with lint-staged on every commit
- **Commitizen + Commitlint** for conventional commit messages
- **Semgrep** for static security analysis
- **npm audit** for dependency vulnerability scanning
- **qlty** for code quality analysis
- **GitHub Actions CI** pipeline running lint, security, audit, and tests with coverage on every push
- **.editorconfig** for consistent editor settings across the team

## Getting Started

### 1. Create a Sanity project

If you don't have a Sanity project yet, create one at [sanity.io/manage](https://www.sanity.io/manage) or run:

```shell
cd studio && npx sanity init
```

### 2. Configure environment variables

```shell
cp frontend/.env.example frontend/.env
cp studio/.env.example studio/.env
```

Open both `.env` files and paste your Sanity project ID.

### 3. Install dependencies and run

**With Docker (recommended):**

```shell
docker compose up
```

**Without Docker:**

```shell
npm install
npm run dev
```

Both options start the Nuxt frontend on [localhost:3000](http://localhost:3000) and Sanity Studio on [localhost:3333](http://localhost:3333).

### 4. Add content

The template comes with `Page`, `Post`, `Person`, and `Settings` document types. Open the Studio, create a `Post`, and publish it — it will appear on the frontend immediately.

To load sample content:

```shell
npm run import-sample-data
```

## Available Scripts

| Command                 | Description                                 |
| ----------------------- | ------------------------------------------- |
| `npm run dev`           | Start frontend and studio in parallel       |
| `npm run lint`          | Run Biome linter                            |
| `npm run lint:fix`      | Auto-fix lint issues                        |
| `npm run format`        | Format all files with Biome                 |
| `npm test`              | Run unit tests (Vitest)                     |
| `npm run test:coverage` | Run unit tests with coverage report         |
| `npm run lint:semgrep`  | Run Semgrep security scan                   |
| `npm run audit`         | Run npm dependency audit                    |
| `npm run commit`        | Open interactive commit prompt (Commitizen) |
| `docker compose up`     | Start everything in Docker                  |

## Git Workflow

Every commit is automatically checked:

- **pre-commit** — lint-staged runs Biome only on your staged files
- **commit-msg** — Commitlint enforces [Conventional Commits](https://www.conventionalcommits.org/) format
- **prepare-commit-msg** — Running `git commit` opens an interactive Commitizen prompt to guide you through writing a proper commit message

## CI Pipeline

GitHub Actions runs on every push and on PRs to `main`:

| Job            | What it does                      |
| -------------- | --------------------------------- |
| **Lint**       | Biome check                       |
| **Semgrep**    | Static security analysis          |
| **Audit**      | npm dependency audit              |
| **Unit Tests** | Vitest suite with coverage report |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, coding standards, and how to submit changes.

## Deploying

### Deploy Sanity Studio

```shell
cd studio && npx sanity deploy
```

### Deploy the Nuxt frontend

Deploy to any platform that supports Nuxt (Ghost Host, Vercel, Netlify, etc.). Set your environment variables on the platform and follow their Nuxt deployment guides.

For details, see the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment).

## License

[MIT](LICENSE)

## Resources

- [Sanity documentation](https://www.sanity.io/docs)
- [Nuxt documentation](https://nuxt.com/docs)
- [Join the Sanity Community](https://slack.sanity.io)
- [Learn Sanity](https://www.sanity.io/learn)
