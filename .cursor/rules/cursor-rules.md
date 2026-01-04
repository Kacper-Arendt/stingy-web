---
globs:
alwaysApply: false
---

# Cursor Agent Rules for stingy-web

## Project Overview

This is a **Turborepo monorepo** managed by **pnpm workspaces**. The main frontend application is `apps/web` built with:

- **React** (with React Compiler)
- **TypeScript** (strict mode)
- **Vite** (build tool)
- **TanStack Router** (file-based routing)
- **TanStack Query** (data fetching & caching)
- **Zod** (schema validation)
- **CSS Modules** (component styling)
- **Biome** (formatting & linting)

## Monorepo Structure

```
stingy-web/
├── apps/
│   └── web/              # Main frontend application
├── packages/
│   ├── ui/               # Shared UI component library (@repo/ui)
│   └── typescript/       # Shared TypeScript configs
└── rules/                # This directory
```

### TypeScript

- **Strict mode**: Always enabled
- **Target**: ES2022
- **Module**: ESNext (bundler mode)
- **Unused variables**: Not allowed (`noUnusedLocals`, `noUnusedParameters`)

### File Naming

- **Components**: PascalCase (e.g., `CreateTeamDialog.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useCreateTeam.ts`)
- **Utilities**: camelCase (e.g., `api.ts`, `colorUtils.ts`)
- **CSS Modules**: `ComponentName.module.css` (same name as component)
- **Schemas**: camelCase with `.schema.ts` suffix (e.g., `team.schema.ts`)

## Architecture Patterns

### Feature-Based Organization

Each feature in `apps/web/src/features/` follows this structure:

```
features/
└── feature-name/
    ├── api/              # API functions (e.g., teams.ts)
    ├── components/      # Feature-specific components
    ├── hooks/           # Custom React hooks (useFeatureName.ts)
    ├── schemas/         # Zod validation schemas
    ├── types/           # TypeScript type definitions
    ├── context/         # React contexts (if needed)
    └── utils/           # Feature-specific utilities
```

**Example**: `features/teams/` contains `api/teams.ts`, `hooks/useCreateTeam.ts`, `schemas/team.schema.ts`

### Component Organization

- **Feature components**: `apps/web/src/features/{feature}/components/`
- **Shared UI components**: `apps/web/src/components/ui/`
- **Layout components**: `apps/web/src/layouts/`
- **UI package components**: `packages/ui/src/{component-name}/`

### Import Paths

- Use `@/` alias for `apps/web/src/` (configured in tsconfig.json)
- Use `@repo/ui/{component}` for UI package imports
- Example: `import { Form, FormItem } from "@repo/ui/form";`
- Example: `import { useT } from "@/locales/useT";`

## Component Patterns

### React Components

```tsx
// Default export for page/route components
export default function ComponentName() {
  // Component logic
}

// Named export for reusable components
export function ComponentName() {
  // Component logic
}
```

### Route components
- if possible use shared route wrapper and route title

### Form Components

- Use `Form` and `FormItem` from `@repo/ui/form`
- Use `useFormErrors` hook for error handling
- Validate with Zod schemas before submission
- Use `useToastManager` for success/error notifications if required

**Example pattern**:

```tsx
const { errors, setFormErrors, clearErrors } = useFormErrors();
const result = Schema().safeParse(formValues);
if (!result.success) return setFormErrors(result.error);
```

### CSS Modules

- **File naming**: `ComponentName.module.css` (matches component name)
- **Class naming**: PascalCase (e.g., `.Card`, `.CardHeader`, `.CardContent`)
- **Import pattern**: `import s from "./component.module.css";`
- **Usage**: `className={s.ClassName}`
- Use CSS custom properties (variables) from `styles.css` for theming
- use css variavbles if possible
- use newest css features

### Zod Schemas

- Use `.optional().default("")` for optional string fields
- Export inferred types: `export type SchemaType = z.infer<ReturnType<typeof Schema>>;`

**Example**:

```ts
export const CreateTeamSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional().default(""),
});
```

## API & Data Fetching

### API Functions

- Located in `features/{feature}/api/` directory
- Use the `api` utility from `@/utils/api.ts`
- Functions should be async and return typed data
- Handle errors appropriately

**Example**:

```ts
export async function createTeam(data: CreateTeamData) {
  return api<Team>(`teams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
```

### TanStack Query

- **Query keys**: Defined in `apps/web/src/integrations/tanstack-query/queryKeys.ts`
- **Pattern**: Use factory objects with hierarchical keys
- **Example**: `teamKeys.detail(teamId)`, `teamKeys.lists()`
- **Hooks**: Create custom hooks in `features/{feature}/hooks/`
- **Invalidation**: Always invalidate related queries on mutations

**Query key pattern**:

```ts
export const teamKeys = {
  all: () => ["teams"] as const,
  lists: () => [...teamKeys.all(), "list"] as const,
  detail: (teamId: string) => [...teamKeys.all(), "detail", teamId] as const,
};
```

**Hook pattern**:

```ts
export function useCreateTeam({ onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTeam,
    onSuccess: (newTeam) => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
      queryClient.setQueryData(teamKeys.detail(newTeam.id), newTeam);
      onSuccess?.();
    },
    onError: (error) => onError?.(error),
  });
}
```

## Routing

### TanStack Router

- **File-based routing**: Routes defined in `apps/web/src/routes/`
- **Route files**: Use `.tsx` extension
- **Layout routes**: Use underscore prefix (e.g., `_system/`)
- **Route tree**: Auto-generated in `routeTree.gen.ts` (do not edit manually)

## Internationalization

- **Translation hook**: `useT()` from `@/locales/useT`
- **Translation files**: `apps/web/src/locales/translations/en.ts`
- **Usage**: `const { t } = useT(); t("translation_key")`
- Always use translation keys, never hardcode strings
- When possible use shared keys

## Build & Development

### Commands

- **Root level**: Use `pnpm` commands (e.g., `pnpm dev`, `pnpm build`)
- **Type checking**: `pnpm check-types` (runs `tsc --noEmit`)
- **Formatting**: `pnpm format` (runs Biome)
- **Linting**: `pnpm lint` (runs Biome)
- **Check**: `pnpm check` (runs Biome check)

### Turbo Tasks

- **Build**: `turbo build` (or `pnpm build`)
- **Dev**: `turbo dev` (or `pnpm dev`)
- **Filter**: Use `--filter=web` for specific app/package

## Code Quality Rules

### DO

✅ Use TypeScript strictly - no `any` types
✅ Use CSS Modules for component styling
✅ Use Zod for form validation if required if not use html validation
✅ Use TanStack Query for data fetching
✅ Use translation keys, never hardcode strings
✅ Follow feature-based folder structure
✅ Export schemas as factory functions
✅ Use PascalCase for CSS class names
✅ Use tabs for indentation
✅ Use double quotes for strings
✅ Invalidate queries after mutations
✅ Handle errors with toast notifications
✅ Use `useFormErrors` hook for form validation
✅ Create custom hooks for TanStack Query operations

### DON'T

❌ Don't use inline styles (use CSS Modules)
❌ Don't create components outside feature folders without reason
❌ Don't create API functions outside `api/` directories
❌ Don't mix feature logic with UI components

## Common Patterns

### Form with Validation Pattern

```tsx
const { errors, setFormErrors, clearErrors } = useFormErrors();
const toastManager = useToastManager();

const submitForm = async (formValues: unknown) => {
  const result = Schema().safeParse(formValues);
  if (!result.success) return setFormErrors(result.error);
  clearErrors();
  // Submit logic
};
```

### Mutation Hook Pattern

```tsx
export function useFeatureAction({ onSuccess, onError }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiFunction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: featureKeys.lists() });
      onSuccess?.();
    },
    onError: (error) => onError?.(error),
  });
}
```

## Environment Variables

- Use `import.meta.env.VITE_*` for environment variables
- Defined in `apps/web/src/config/app.ts`

## Package Manager

- **Always use `pnpm`** - never use npm or yarn
- **Version**: pnpm@10.24.0 (specified in package.json)
- **Workspaces**: Configured in `pnpm-workspace.yaml`

## Additional Notes

- React Compiler is enabled via Babel plugin
- CSS custom properties are defined in `packages/ui/src/styles.css` and `apps/web/src/styles.css`
- Node version requirement: >=24
