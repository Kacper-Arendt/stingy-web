# Onboarding Feature

This feature provides an interactive onboarding system that shows informational modals to users when they visit key routes for the first time.

## Structure

```
onboarding/
├── api/
│   └── onboarding.api.ts          # API calls to backend
├── components/
│   ├── OnboardingModal.tsx        # Reusable modal component
│   └── content/                   # Route-specific content
│       ├── TeamsListOnboarding.tsx
│       ├── TeamDetailOnboarding.tsx
│       └── RetrospectiveOnboarding.tsx
├── hooks/
│   ├── useOnboarding.ts           # React Query hooks
│   └── useOnboardingModal.ts      # Modal state management
└── types/
    └── onboarding.ts              # TypeScript types
```

## Usage

### 1. In a Route Component

```tsx
import { OnboardingModal } from "@/features/onboarding/components/OnboardingModal";
import { getTeamsListOnboardingSections } from "@/features/onboarding/components/content/TeamsListOnboarding";
import { useOnboardingModal } from "@/features/onboarding/hooks/useOnboardingModal";
import { OnboardingRouteKey } from "@/features/onboarding/types/onboarding";

export function MyRoute() {
  const { isOpen, handleClose, showManually } = useOnboardingModal(
    OnboardingRouteKey.TEAMS_LIST
  );

  // Make showManually available for the Header
  if (typeof window !== "undefined") {
    (window as any).__showOnboardingGuide = showManually;
  }

  return (
    <>
      <div>Your route content...</div>

      <OnboardingModal
        open={isOpen}
        onClose={handleClose}
        title={m.onboarding_teams_list_title()}
        sections={getTeamsListOnboardingSections()}
      />
    </>
  );
}
```

### 2. Creating Content for a New Route

Create a new file in `components/content/`:

```tsx
import { m } from "@/paraglide/messages";
import type { OnboardingSection } from "../OnboardingModal";

export const getMyRouteOnboardingSections = (): OnboardingSection[] => [
  {
    title: m.onboarding_my_route_section_1_title(),
    content: (
      <div className="space-y-2">
        <p>{m.onboarding_my_route_section_1_content()}</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>{m.onboarding_my_route_section_1_item_1()}</li>
          <li>{m.onboarding_my_route_section_1_item_2()}</li>
        </ul>
      </div>
    ),
  },
  // ... more sections
];
```

## Features

### Auto-Show on First Visit

- Modal automatically shows when user visits a route for the first time (no status)
- Tracked via Product Tour Tracking API (`/api/profiles/me/tours`)
- Persists across sessions and devices
- Status `0` (Done) is set when user completes the tour
- Tours with any status (Done, Closed, Todo) won't auto-show again

### Manual Trigger

- Users can re-open the guide from the user dropdown menu
- "Show Guide" option appears in UserNav dropdown
- Available on all routes that have onboarding configured

### Route Keys

Defined in `types/onboarding.ts`:

- `TEAMS_LIST`: Main teams list page
- `TEAM_DETAIL`: Individual team page
- `RETROSPECTIVE`: Retrospective board

## Internationalization

All text must be defined in `messages/en.json` following the pattern:

```json
{
  "onboarding_<route>_title": "Modal Title",
  "onboarding_<route>_section_<name>_title": "Section Title",
  "onboarding_<route>_section_<name>_content": "Section content text",
  "onboarding_<route>_section_<name>_item_1": "List item text"
}
```

## Backend Requirements

The backend implements the Product Tour Tracking API:

- `GET /api/profiles/me/tours` - Get all tour statuses
  - Returns: `[{ tourKey: string, status: number }]`
- `POST /api/profiles/me/tours` - Set/update tour status
  - Request: `{ tourKey: string, status: number }`
  - Status: `0` = Done (completed), `1` = Closed (dismissed), `2` = Todo (view later)

See `docs/onboarding-api-endpoints.md` for full API documentation.

## State Management

- Uses React Query for server state
- Query keys defined in `integrations/tanstack-query/queryKeys.ts`
- Auto-invalidates on mutations
- 5-minute stale time for status queries
