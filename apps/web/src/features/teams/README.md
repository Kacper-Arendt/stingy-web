# Team Permissions System - Frontend Integration

## Overview
Frontend implementation of the Team Permissions system providing fine-grained access control for team operations.

## Architecture

### Core Components
- **TeamPermissionsContext** - React context for managing permissions across components
- **useTeamPermissions** - Hook for accessing permissions from context
- **Permission utilities** - Helper functions for permission validation and fallbacks

### Permission Types
```typescript
interface TeamPermissions {
  canEditTeam: boolean;          // Edit team name/description
  canDeleteTeam: boolean;        // Delete entire team
  canManageParticipants: boolean; // Add/remove team members
  canChangeUserRoles: boolean;   // Modify participant roles
  canCreateRetro: boolean;       // Create retrospectives
  canInviteUsers: boolean;       // Send invitations
}
```

## Usage Examples

### 1. Using Permissions Context
```tsx
import { useTeamPermissions } from "../context/TeamPermissionsContext";

function TeamActions() {
  const permissions = useTeamPermissions();
  
  return (
    <div>
      {permissions.canCreateRetro && (
        <Button>Create Retro</Button>
      )}
      {permissions.canEditTeam && (
        <Button>Edit Team</Button>
      )}
    </div>
  );
}
```

### 2. Permission Utilities
```tsx
import { hasManagementPermissions, getTeamPermissionsWithFallback } from "../utils/teamPermissions";

// Check if user has management rights
const hasManagement = hasManagementPermissions(team.permissions);

// Get permissions with role-based fallback
const permissions = getTeamPermissionsWithFallback(team.permissions, team.userRole);
```

## Components Integration

### TeamHeader
- Shows "Create Retro" button only if `canCreateRetro`
- Shows "Team Settings" only if `canEditTeam`
- Conditionally renders EditTeamForm

### EditTeamForm
- Shows delete section only if `canDeleteTeam`
- Uses permissions from context

### TeamMembers
- Shows "Invite" button only if `canInviteUsers`

### TeamCard
- Visual indicators for available permissions
- Management icon for users with admin rights

## Fallback Strategy

When permissions are not available from API, the system falls back to role-based defaults:

- **Owner**: All permissions enabled
- **Admin**: All except `canDeleteTeam` and `canChangeUserRoles`
- **Member**: Only `canCreateRetro`

## API Integration

Permissions are fetched from:
- **Team details**: `/api/teams/{teamId}` includes permissions
- **Dedicated endpoint**: `/api/teams/{teamId}/permissions` (optional)

## Performance

- Permissions cached for 1 minute (matches backend TTL)
- Context provides efficient prop drilling alternative
- Fallback utilities prevent API dependency issues 