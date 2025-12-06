# Copilot Instructions for stingy-web

## Project Overview
- **Monorepo managed by Turborepo**: Contains multiple apps/packages, with `apps/web` as the main frontend (Vite + React + TypeScript).
- **Apps and Packages**: Structure is modular. Shared code and configs are in `packages/` and `apps/web`.
- **Frontend**: Uses React, Vite, TanStack Query, and custom UI components in `src/components/ui/`.

## Key Workflows
- **Build**: Use `turbo build` (or `pnpm exec turbo build`) from the repo root. Filter builds with `--filter=web` for the web app.
- **Develop**: Use `turbo dev` (or `pnpm exec turbo dev`) for local development. Filter with `--filter=web` for the web app.
- **Remote Caching**: Optionally use Vercel Remote Cache for CI/CD acceleration (`turbo login`, `turbo link`).

## Conventions & Patterns
- **TypeScript everywhere**: All code is strictly typed.
- **React components**: Organized by domain (e.g., `features/teams`, `features/auth`). Shared UI in `components/ui/`.
- **Feature folders**: Each feature (auth, teams, onboarding, userProfiles) has its own API, components, hooks, and types subfolders.
- **TanStack Query**: Query keys and providers are in `integrations/tanstack-query/`.
- **Config**: App-level config in `src/config/app.ts`.
- **Routing**: Route definitions in `src/routes/` (file-based, with nested folders for subroutes).
- **Styling**: Global styles in `src/styles.css`, component styles in `components/ui/editor.css`.

## External Integrations
- **Vercel**: Used for remote caching and deployment.
- **TanStack Query**: For data fetching and caching.

## Examples
- **Add a new feature**: Create a folder in `features/`, add `api/`, `components/`, `hooks/`, and `types/` as needed.
- **Add a new route**: Create a file/folder in `src/routes/`.
- **Add a new UI component**: Place in `src/components/ui/` and follow existing patterns.

## References
- Main frontend: `apps/web/src/`
- Shared UI: `apps/web/src/components/ui/`
- Feature modules: `apps/web/src/features/`
- Routing: `apps/web/src/routes/`
- Query integration: `apps/web/src/integrations/tanstack-query/`

## Tips for AI Agents
- Prefer TypeScript and React 19 best practices.
- Use TanStack Query for data fetching.
- Follow feature folder structure for new code.
- Use Turbo commands for builds/dev.
- Reference existing components and hooks for patterns.

---

_Review and update this file as project structure or conventions evolve._
