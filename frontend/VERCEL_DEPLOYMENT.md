# Vercel Deployment Guide

## Configuration Files

### 1. vercel.json
This file tells Vercel how to handle client-side routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 2. public/_redirects
This file provides a fallback for static hosting:

```
/*    /index.html   200
```

## Environment Variables

Make sure to set these environment variables in your Vercel project settings:

- `VITE_COGNITO_AUTHORITY`
- `VITE_CLIENT_ID`
- `VITE_SUCCESS_REDIRECT_URI`
- `VITE_BACKEND_URL`

## Deployment Steps

1. Connect your GitHub repository to Vercel
2. Set the build command: `npm run build`
3. Set the output directory: `dist`
4. Add environment variables in Vercel dashboard
5. Deploy

## Troubleshooting

If routes are not working:

1. Check that `vercel.json` is in the root of your frontend directory
2. Verify environment variables are set correctly
3. Check the Vercel deployment logs for any build errors
4. Ensure the `_redirects` file is in the `public` directory

## Testing Routes

After deployment, test these routes:
- `/` (home)
- `/about`
- `/login`
- `/register`
- `/admin`
- `/success` 