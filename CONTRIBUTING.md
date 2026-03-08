# Contributing

Thanks for your interest in contributing! This guide covers setup, conventions, and how to submit changes.

## Setup

```shell
git clone <repo-url>
cd sanity-nuxt-strict-starter
npm install
cp frontend/.env.example frontend/.env
cp studio/.env.example studio/.env
```

Add your Sanity project ID to both `.env` files, then start the dev servers:

```shell
npm run dev
```

Or with Docker:

```shell
docker compose up
```

## Code Quality

This project uses **Biome** for linting and formatting. It runs automatically on pre-commit via **lint-staged**, so only your staged files are checked.

To run manually:

```shell
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
npm run format      # Format all files
```

## Testing

```shell
npm test                                # Run unit tests
npm test -- --coverage                  # Run with coverage report
cd frontend && npx playwright test      # Run e2e tests
```

## Commit Messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Running `git commit` will open an interactive prompt (Commitizen) to guide you.

Format: `type(scope): description`

Common types:
- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation only
- `style` — Formatting (no code change)
- `refactor` — Code change that neither fixes a bug nor adds a feature
- `test` — Adding or updating tests
- `build` — Build system or dependencies
- `ci` — CI configuration
- `chore` — Other changes

## Submitting Changes

1. Create a feature branch from `main`
2. Make your changes and commit using conventional commits
3. Push your branch and open a pull request
4. CI will run lint, security, audit, and test checks automatically
5. Request a review from the appropriate code owners
