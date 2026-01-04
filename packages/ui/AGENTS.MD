## UI Package (@repo/ui)

### Component Structure

Each component in `packages/ui/src/{component-name}/`:

- `{ComponentName}.tsx` - Component file
- `{component-name}.module.css` - Styles file
- Exported via `package.json` exports field

### Component Patterns

- Use `@base-ui/react` primitives when available
- Accept standard React props
- Use CSS Modules for styling
- Follow accessibility best practices
- Export components as default or named exports based on package.json

### Adding New UI Components

1. Create directory: `packages/ui/src/{component-name}/`
2. Create component file: `{ComponentName}.tsx`
3. Create styles file: `{component-name}.module.css`
4. Add export to `packages/ui/package.json` exports field
5. Use CSS custom properties for theming
