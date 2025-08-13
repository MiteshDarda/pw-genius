# Centralized Navbar System

This project now uses a centralized navbar management system located in `App.tsx` that makes it easy to manage and reuse navbar configurations across different routes.

## How It Works

The navbar is now centrally managed in `App.tsx` and automatically renders based on the current route. Each route can have its own navbar configuration with different navigation items and actions.

## Navbar Configuration

The navbar configuration is defined in the `getNavbarConfig` function in `App.tsx`. Each route can specify:

- `logoSrc`: Path to the logo image
- `navItems`: Array of navigation items with label and href
- `secondaryAction`: Secondary action button (Login/Logout) with label, href, or onClick

## Current Configurations

### Landing Page (`/`)
- Navigation items: About, Eligibility, Winners, Contact
- Secondary action: Login button (redirects to auth)

### About Page (`/about`)
- Navigation items: About, Eligibility, Winners, Contact
- Secondary action: Login link (navigates to /login)

### Registration Form (`/register`)
- No navigation items (clean interface)
- Secondary action: Logout button (signs out user)

### Admin Pages (`/admin/*`)
- Navigation items: Dashboard, Nominations
- Secondary action: Logout button (signs out user)

### Other Routes
- Login, Success pages: No navbar (clean authentication flow)

## Adding New Routes

To add a new route with a custom navbar:

1. Add the route to the `Routes` section in `App.tsx`
2. Add a new case in the `getNavbarConfig` function
3. Return the appropriate navbar configuration

Example:
```typescript
case "/new-page":
  return {
    logoSrc: "/pw-logo-long.png",
    navItems: [
      { label: "Home", href: "/" },
      { label: "New Page", href: "/new-page" },
    ],
    secondaryAction: {
      label: "Login",
      href: "/login"
    },
  };
```

## Benefits

- **Centralized Management**: All navbar configurations in one place
- **Consistent Styling**: Uniform appearance across all pages
- **Easy Maintenance**: Update navbar logic in one location
- **Route-based Configuration**: Different navbar for different routes
- **Type Safety**: Full TypeScript support with proper interfaces

## Navbar Component

The `Navbar` component in `components/navbar/index.tsx` handles:
- Responsive design (desktop/mobile)
- Logo display
- Navigation items
- Secondary actions (buttons or links)
- Mobile menu toggle

## Migration Notes

- Removed individual navbar imports from pages
- Removed `MinimalNavbar` from registration form
- All navbar logic now centralized in `App.tsx`
- Pages no longer need to manage their own navigation
