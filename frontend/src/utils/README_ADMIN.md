# Admin Group Checking Documentation

This document explains how to check if a user belongs to the admin group or any other Cognito group in your application.

## Overview

The admin checking functionality is implemented in `auth.ts` and provides several ways to check user group membership with comprehensive error handling and edge case management.

## Available Functions

### 1. `isUserAdmin(token?: string): boolean`
Checks if the current user belongs to the 'admin' group.

**Parameters:**
- `token` (optional): JWT access token. If not provided, will try to get from stored user data.

**Returns:**
- `boolean`: `true` if user is admin, `false` otherwise.

**Example:**
```typescript
import { isUserAdmin } from '../utils/auth';

// Check if current user is admin
const isAdmin = isUserAdmin();
if (isAdmin) {
  console.log('User is an admin');
} else {
  console.log('User is not an admin');
}
```

### 2. `isUserInGroup(groupName: string, token?: string): boolean`
Checks if the current user belongs to a specific group.

**Parameters:**
- `groupName`: Name of the group to check (e.g., 'admin', 'moderator', 'user')
- `token` (optional): JWT access token. If not provided, will try to get from stored user data.

**Returns:**
- `boolean`: `true` if user is in the group, `false` otherwise.

**Example:**
```typescript
import { isUserInGroup } from '../utils/auth';

// Check if user is a moderator
const isModerator = isUserInGroup('moderator');
if (isModerator) {
  console.log('User is a moderator');
}

// Check if user is in multiple groups
const isAdmin = isUserInGroup('admin');
const isModerator = isUserInGroup('moderator');
const isEditor = isUserInGroup('editor');
```

### 3. `getUserGroups(token?: string): string[]`
Gets all groups that the current user belongs to.

**Parameters:**
- `token` (optional): JWT access token. If not provided, will try to get from stored user data.

**Returns:**
- `string[]`: Array of group names the user belongs to.

**Example:**
```typescript
import { getUserGroups } from '../utils/auth';

const userGroups = getUserGroups();
console.log('User groups:', userGroups); // ['admin', 'moderator']
```

### 4. `getAllUserGroups(token?: string): string[]`
Alias for `getUserGroups()` - gets all user groups.

### 5. `decodeJWTToken(token: string): JWTPayload | null`
Safely decodes a JWT token and returns the payload.

**Parameters:**
- `token`: JWT token string.

**Returns:**
- `JWTPayload | null`: Decoded token payload or null if invalid.

**Example:**
```typescript
import { decodeJWTToken } from '../utils/auth';

const userData = localStorage.getItem('cognitoUser');
if (userData) {
  const parsed = JSON.parse(userData);
  const decoded = decodeJWTToken(parsed.access_token);
  
  if (decoded) {
    console.log('User email:', decoded.email);
    console.log('User groups:', decoded['cognito:groups']);
    console.log('Token expires:', new Date(decoded.exp * 1000));
  }
}
```

## React Components and Hooks

### AdminCheck Component

A React component that conditionally renders content based on admin status.

**Props:**
- `children`: Content to render if user is admin
- `fallback`: Content to render if user is not admin (default: "Access Denied: Admin privileges required")
- `showGroups`: Whether to show user groups (default: false)

**Example:**
```typescript
import AdminCheck from '../components/AdminCheck';

function MyComponent() {
  return (
    <AdminCheck showGroups={true}>
      <div>
        <h2>Admin Panel</h2>
        <p>This content is only visible to admins.</p>
        <button>Admin Action</button>
      </div>
    </AdminCheck>
  );
}
```

### useAdminStatus Hook

A React hook that provides admin status and user groups.

**Returns:**
- `isAdmin`: boolean | null - Whether user is admin
- `userGroups`: string[] - Array of user groups
- `loading`: boolean - Whether the check is in progress

**Example:**
```typescript
import { useAdminStatus } from '../components/AdminCheck';

function MyComponent() {
  const { isAdmin, userGroups, loading } = useAdminStatus();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAdmin ? (
        <div>Welcome Admin!</div>
      ) : (
        <div>Regular user</div>
      )}
      <p>Your groups: {userGroups.join(', ')}</p>
    </div>
  );
}
```

### useGroupMembership Hook

A React hook that checks membership in a specific group.

**Parameters:**
- `groupName`: string - Name of the group to check

**Returns:**
- `isMember`: boolean | null - Whether user is in the group
- `loading`: boolean - Whether the check is in progress

**Example:**
```typescript
import { useGroupMembership } from '../components/AdminCheck';

function MyComponent() {
  const { isMember: isModerator, loading } = useGroupMembership('moderator');

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isModerator ? (
        <div>Moderator Panel</div>
      ) : (
        <div>Not a moderator</div>
      )}
    </div>
  );
}
```

## Edge Cases and Error Handling

The implementation handles the following edge cases:

### 1. Missing or Invalid Token
```typescript
// Returns false if no token is available
const isAdmin = isUserAdmin(); // false if no token
const groups = getUserGroups(); // [] if no token
```

### 2. Malformed JWT Token
```typescript
// Safely handles malformed tokens
const decoded = decodeJWTToken('invalid.token.format'); // returns null
```

### 3. Missing Groups in Token
```typescript
// Handles tokens without group information
const groups = getUserGroups(); // [] if no groups in token
```

### 4. Network Errors
```typescript
// All functions are designed to work offline
// They only rely on locally stored tokens
const isAdmin = isUserAdmin(); // Works without network
```

### 5. Type Safety
```typescript
// Validates input parameters
const isInGroup = isUserInGroup(''); // false - empty string
const isInGroup = isUserInGroup(null as any); // false - invalid input
```

## Best Practices

### 1. Always Handle Loading States
```typescript
const { isAdmin, loading } = useAdminStatus();

if (loading) {
  return <div>Checking permissions...</div>;
}

return isAdmin ? <AdminPanel /> : <AccessDenied />;
```

### 2. Provide Fallback Content
```typescript
<AdminCheck 
  fallback={<div>You need admin access for this feature</div>}
>
  <AdminOnlyContent />
</AdminCheck>
```

### 3. Log for Debugging
```typescript
const groups = getUserGroups();
console.log('User groups:', groups);

const isAdmin = isUserAdmin();
console.log('Is admin:', isAdmin);
```

### 4. Check Multiple Groups
```typescript
const userGroups = getUserGroups();
const hasAdminAccess = userGroups.includes('admin');
const hasModeratorAccess = userGroups.includes('moderator');
const hasEditorAccess = userGroups.includes('editor');
```

### 5. Handle Token Expiration
```typescript
import { validateUserSession } from '../utils/auth';

// Check if session is still valid
const isValid = await validateUserSession();
if (!isValid) {
  // Redirect to login or refresh token
  window.location.href = '/login';
}
```

## Security Considerations

1. **Client-Side Only**: These functions work with client-side token validation. For sensitive operations, always validate on the server side.

2. **Token Storage**: Tokens are stored in localStorage. Consider using httpOnly cookies for better security.

3. **Token Expiration**: Always check token expiration before making important decisions.

4. **Group Names**: Be consistent with group names across your application.

## Troubleshooting

### Common Issues

1. **User shows as not admin when they should be**
   - Check if the user is actually in the 'admin' group in Cognito
   - Verify the token contains the correct groups
   - Check if the token is expired

2. **Groups array is empty**
   - Ensure the user is assigned to groups in Cognito
   - Check if the token includes group information
   - Verify the token format

3. **Functions return unexpected values**
   - Check browser console for errors
   - Verify token format and content
   - Ensure proper error handling

### Debug Information

Use the debug functions to troubleshoot:

```typescript
// Analyze token content
const userData = localStorage.getItem('cognitoUser');
if (userData) {
  const parsed = JSON.parse(userData);
  const decoded = decodeJWTToken(parsed.access_token);
  console.log('Token analysis:', decoded);
}

// Check all user groups
const groups = getAllUserGroups();
console.log('All groups:', groups);

// Check specific group membership
const isAdmin = isUserInGroup('admin');
console.log('Is admin:', isAdmin);
```

## Integration with Existing Code

The admin checking functions are designed to work with your existing authentication system. They:

1. Use the same token storage mechanism
2. Follow the same error handling patterns
3. Integrate with your existing user data structure
4. Work with your current Cognito setup

You can gradually replace existing admin checking code with these more robust functions. 