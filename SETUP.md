# Cerberus Auth UI - Quick Setup Guide

## What This Is

This is a standalone React application that provides the login UI for your Cerberus IAM OAuth flow. It's designed to work with your Cerberus IAM API and cannot be accessed directly - it requires OAuth parameters to function.

## Quick Start

### 1. Environment Setup

The `.env.local` file is already configured with:
```env
VITE_API_URL=https://api.cerberus-iam.com
```

Update this URL if your Cerberus IAM API is hosted elsewhere.

### 2. Run Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173`

### 3. Test the Flow

You **cannot** access `http://localhost:5173/login` directly - it will redirect to `/unauthorized`.

The app must be accessed through an OAuth flow with a `redirect_uri` parameter:

```
http://localhost:5173/login?redirect_uri=/oauth2/authorize?client_id=...&redirect_uri=...
```

## How It Works

1. User tries to login to your Laravel app (`http://localhost:8000/login`)
2. Laravel redirects to Cerberus IAM (`https://api.cerberus-iam.com/oauth2/authorize?...`)
3. Cerberus IAM sees user isn't authenticated, redirects to this app:
   ```
   http://localhost:5173/login?redirect_uri=/oauth2/authorize?...
   ```
4. User enters credentials and logs in
5. This app POSTs to Cerberus IAM API (`/api/auth/login`)
6. After authentication, redirects back to Cerberus IAM OAuth endpoint
7. OAuth flow completes, user returns to your Laravel app authenticated

## Routes

- `/login` - Login page (protected, requires OAuth parameters)
- `/unauthorized` - Shown when trying to access login without OAuth flow
- All other routes → redirect to `/unauthorized`

## API Endpoints Required

Your Cerberus IAM API must implement:

### POST /api/auth/login
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

### GET /api/auth/me
Checks authentication status

### GET /sanctum/csrf-cookie
CSRF token initialization

## CORS Configuration

Your Cerberus IAM API must allow this origin in CORS:

```php
'allowed_origins' => [
    'http://localhost:5173',  // Development
],
'supports_credentials' => true,
```

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Deployment

Deploy the `dist/` folder to:
- Vercel
- Netlify
- Any static hosting service

Don't forget to set the `VITE_API_URL` environment variable in your hosting platform!

## Security Features

✅ Protected routes - login page requires OAuth parameters
✅ CSRF protection - automatically fetched before POST requests
✅ Credentials included - cookies sent with all requests
✅ Type-safe - built with TypeScript
✅ Modern UI - shadcn/ui components

## Next Steps

1. Implement the required API endpoints on your Cerberus IAM API
2. Configure CORS on Cerberus IAM API
3. Update your Cerberus IAM OAuth authorize endpoint to redirect to this app
4. Test the complete OAuth flow from your Laravel app

## Troubleshooting

**"Access Denied" page shows**: This is correct! The login page requires OAuth parameters.

**CORS errors**: Ensure your API allows `http://localhost:5173` and has `supports_credentials: true`.

**Login fails**: Check that your API endpoints return the expected JSON structure.

**Build fails**: Make sure all dependencies are installed with `npm install`.
