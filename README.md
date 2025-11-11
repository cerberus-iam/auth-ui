# Cerberus IAM Authentication UI

<div align="center">

![Cerberus IAM](https://img.shields.io/badge/Cerberus-IAM-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![License](https://img.shields.io/badge/License-Private-red)

A standalone React application providing a secure, beautiful login interface for OAuth 2.0 authentication flows with Cerberus IAM.

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [API Documentation](#api-integration) • [Deployment](#deployment)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Integration](#api-integration)
- [CORS Configuration](#cors-configuration)
- [Security](#security)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Technologies](#technologies)
- [License](#license)

---

## Overview

The **Cerberus IAM Authentication UI** is a purpose-built React application that serves as the frontend authentication layer for the Cerberus Identity and Access Management system. It provides a secure, user-friendly login interface that seamlessly integrates with OAuth 2.0 authorization flows.

### Why This Exists

Traditional IAM systems often couple authentication UI with the backend, making it difficult to customize and maintain. This application separates concerns by:

- **Decoupling**: Independent frontend that can be hosted separately from your API
- **Flexibility**: Easy to customize and brand without touching backend code
- **Security**: Built-in protections against common vulnerabilities (CSRF, XSS)
- **Modern UX**: Beautiful, responsive interface using modern design patterns

### Key Differentiator

Unlike standard login pages, this application **cannot be accessed directly**. It's designed specifically for OAuth flows and requires valid OAuth parameters, providing an additional layer of security by preventing unauthorized access attempts.

---

## Features

### 🔐 Security First

- **OAuth 2.0 with PKCE Support**: Industry-standard authorization framework
- **CSRF Protection**: Automatic token fetching and validation
- **Protected Routes**: Login page requires OAuth redirect parameters
- **Session-Based Auth**: Secure cookie-based authentication with HttpOnly flags
- **XSS Prevention**: React's built-in protection + TypeScript type safety

### 🎨 Modern User Experience

- **Beautiful UI**: Clean, modern design using shadcn/ui components
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Loading States**: Clear visual feedback during authentication
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG 2.1 compliant components

### ⚡ Performance

- **Fast Load Times**: Vite-powered build with optimized chunks
- **Minimal Bundle Size**: Tree-shaking and code splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Assets**: Compressed CSS and JavaScript

### 🛠️ Developer Experience

- **TypeScript**: Full type safety throughout the application
- **Hot Module Replacement**: Instant updates during development
- **ESLint Integration**: Code quality and consistency
- **Component Library**: Reusable shadcn/ui components
- **Well-Documented**: Comprehensive inline comments and documentation

---

## Architecture

This application operates as part of a **three-component OAuth 2.0 ecosystem**:

```
┌─────────────────────┐
│   Client App        │  1. User initiates login
│   (Your Laravel)    │──────────────────────────┐
└─────────────────────┘                          │
         ▲                                       │
         │                                       ▼
         │ 7. Returns                 ┌─────────────────────┐
         │    authenticated           │  Cerberus IAM API   │
         │                            │  (OAuth Provider)   │
         │                            └─────────────────────┘
         │                                       │
         │                                       │ 2. Redirects to
         │                                       │    login UI
         │                                       ▼
         │                            ┌─────────────────────┐
         │                            │    This App         │
         │                            │  (Login Frontend)   │
         │                            └─────────────────────┘
         │                                       │
         └───────────────────────────────────────┘
              6. OAuth callback with code
```

### Flow Diagram

```
User Action          │ Client App              │ Cerberus API           │ This App
─────────────────────┼─────────────────────────┼────────────────────────┼──────────────────
1. Visit /login      │                         │                        │
                     │ Redirect to OAuth       │                        │
2.                   │ ─────────────────────>  │                        │
                     │                         │ Check authentication   │
3.                   │                         │ ─────────────────────> │
                     │                         │                        │ Show login form
4. Enter credentials │                         │                        │
                     │                         │ <───── POST /login ────│
5.                   │                         │ Authenticate user      │
                     │                         │ ─────────────────────> │
6.                   │                         │ Redirect to OAuth      │
                     │ <──── Callback ─────────│                        │
7. Authenticated!    │                         │                        │
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **npm**: Version 9.x or higher (comes with Node.js)
- **Cerberus IAM API**: Running and accessible
- **Git**: For version control (optional but recommended)

### System Requirements

- **Operating System**: macOS, Linux, or Windows with WSL2
- **Memory**: Minimum 4GB RAM
- **Disk Space**: At least 500MB free space

---

## Installation

### 1. Clone or Navigate to the Project

```bash
cd cerberus-auth-ui
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:

- React and React DOM
- React Router for routing
- Axios for HTTP requests
- Tailwind CSS for styling
- shadcn/ui components
- TypeScript and type definitions

### 3. Verify Installation

```bash
npm run dev
```

If successful, you'll see:

```
  VITE v7.2.1  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Cerberus IAM API Base URL
# This is where your Cerberus IAM API is hosted
VITE_API_URL=https://api.cerberus-iam.com

# Optional: For local development, you might use:
# VITE_API_URL=http://localhost:8001
```

### Environment-Specific Configuration

**Development (`.env.local`)**:

```env
VITE_API_URL=http://localhost:8001
```

**Staging (`.env.staging`)**:

```env
VITE_API_URL=https://staging-api.cerberus-iam.com
```

**Production (set in hosting platform)**:

```env
VITE_API_URL=https://api.cerberus-iam.com
```

### Configuration Best Practices

- ✅ Never commit `.env.local` to version control
- ✅ Use different API URLs for different environments
- ✅ Always use HTTPS in production
- ❌ Don't hardcode API URLs in components
- ❌ Don't expose sensitive data in environment variables

---

## Development

### Starting the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Development Features

- **Hot Module Replacement (HMR)**: Changes reflect instantly without page reload
- **Fast Refresh**: Preserves component state during edits
- **Source Maps**: Easy debugging with original source code
- **Error Overlay**: Clear error messages in the browser

### Code Quality Tools

**Linting**:

```bash
npm run lint
```

**Type Checking**:

```bash
npm run type-check
```

### Recommended IDE Setup

- **VSCode**: Recommended IDE
- **Extensions**:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin (Volar)

---

## Project Structure

```
cerberus-auth-ui/
│
├── src/                          # Source code
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── alert.tsx         # Alert component
│   │   │   ├── button.tsx        # Button component
│   │   │   ├── card.tsx          # Card components
│   │   │   ├── input.tsx         # Input component
│   │   │   └── label.tsx         # Label component
│   │   └── ProtectedRoute.tsx    # Route protection HOC
│   │
│   ├── context/                  # React context providers
│   │   └── AuthContext.tsx       # Authentication state management
│   │
│   ├── lib/                      # Utility libraries
│   │   ├── api.ts                # Axios instance & interceptors
│   │   └── utils.ts              # Utility functions (cn, etc.)
│   │
│   ├── pages/                    # Page components
│   │   ├── Login.tsx             # Login page
│   │   └── Unauthorized.tsx      # Unauthorized access page
│   │
│   ├── App.tsx                   # Root application component
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Global styles & Tailwind imports
│
├── public/                       # Static assets
│   └── vite.svg                  # Vite logo
│
├── dist/                         # Production build (generated)
│
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment (gitignored)
├── .gitignore                    # Git ignore rules
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML entry point
├── package.json                  # Dependencies & scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.app.json             # App-specific TypeScript config
├── tsconfig.node.json            # Node-specific TypeScript config
├── vite.config.ts                # Vite build configuration
├── README.md                     # This file
└── SETUP.md                      # Quick setup guide
```

### Key Files Explained

**`src/context/AuthContext.tsx`**

- Manages authentication state globally
- Provides login and auth check functions
- Handles OAuth redirect logic

**`src/lib/api.ts`**

- Configures Axios with base URL and credentials
- Implements request interceptor for CSRF tokens
- Centralized API error handling

**`src/components/ProtectedRoute.tsx`**

- Higher-order component for route protection
- Validates OAuth redirect_uri parameter
- Redirects unauthorized access attempts

**`src/pages/Login.tsx`**

- Main login interface
- Form validation and submission
- Loading and error states

---

## Usage

### Important: This App Requires OAuth Parameters

⚠️ **You cannot access the login page directly!**

Attempting to visit `http://localhost:5173/login` will redirect you to the "Unauthorized" page. This is by design.

### Correct Usage Flow

The application must be accessed through an OAuth authorization flow:

```
http://localhost:5173/login?redirect_uri=/oauth2/authorize?client_id=xxx&...
```

### Complete OAuth Flow Example

#### Step 1: User Initiates Login

User visits your client application:

```
http://localhost:8000/login
```

#### Step 2: Client Redirects to Cerberus IAM

Your Laravel app redirects to:

```
https://api.cerberus-iam.com/oauth2/authorize?
  response_type=code&
  client_id=client_abcd1234&
  redirect_uri=http://localhost:8000/cerberus/callback&
  scope=openid+profile+email&
  state=random-state-token&
  code_challenge=base64-challenge&
  code_challenge_method=S256
```

#### Step 3: Cerberus IAM Checks Authentication

If user is not authenticated, Cerberus redirects to this app:

```
http://localhost:5173/login?redirect_uri=/oauth2/authorize?...
```

#### Step 4: User Authenticates

User enters credentials in the login form

#### Step 5: This App Authenticates User

POSTs to Cerberus IAM API:

```javascript
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password"
}
```

#### Step 6: Redirect Back to OAuth

After successful authentication, redirects to:

```
https://api.cerberus-iam.com/oauth2/authorize?...
```

#### Step 7: OAuth Flow Completes

Cerberus redirects back to client with authorization code:

```
http://localhost:8000/cerberus/callback?code=auth-code&state=...
```

#### Step 8: User is Authenticated

Client exchanges code for access token, user is logged in!

---

## API Integration

This application expects your Cerberus IAM API to implement the following endpoints:

### POST /api/auth/login

Authenticates a user with email and password.

**Endpoint**: `/api/auth/login`
**Method**: `POST`
**Authentication**: None (public)
**Content-Type**: `application/json`

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "user": {
    "id": "user_123456",
    "email": "user@example.com",
    "name": "John Doe",
    "email_verified_at": "2025-01-15T10:30:00Z"
  }
}
```

**Error Response (401 Unauthorized)**:

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Error Response (422 Validation Error)**:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required."],
    "password": ["The password field is required."]
  }
}
```

### GET /api/auth/me

Checks if the current user is authenticated.

**Endpoint**: `/api/auth/me`
**Method**: `GET`
**Authentication**: Session cookie
**Content-Type**: `application/json`

**Success Response (200 OK)**:

```json
{
  "authenticated": true,
  "user": {
    "id": "user_123456",
    "email": "user@example.com",
    "name": "John Doe",
    "email_verified_at": "2025-01-15T10:30:00Z"
  }
}
```

**Unauthenticated Response (401 Unauthorized)**:

```json
{
  "authenticated": false
}
```

### GET /sanctum/csrf-cookie

Initializes CSRF protection for the session.

**Endpoint**: `/sanctum/csrf-cookie`
**Method**: `GET`
**Authentication**: None
**Response**: No body, sets XSRF-TOKEN cookie

**Success Response (204 No Content)**:

```
Headers:
  Set-Cookie: XSRF-TOKEN=...; Path=/; Secure; HttpOnly
```

### API Implementation Example (Laravel)

```php
// routes/api.php
Route::post('/auth/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'user' => Auth::user(),
        ]);
    }

    return response()->json([
        'success' => false,
        'message' => 'Invalid credentials',
    ], 401);
});

Route::get('/auth/me', function (Request $request) {
    if (Auth::check()) {
        return response()->json([
            'authenticated' => true,
            'user' => Auth::user(),
        ]);
    }

    return response()->json([
        'authenticated' => false,
    ], 401);
});
```

---

## CORS Configuration

Cross-Origin Resource Sharing (CORS) must be configured on your Cerberus IAM API to allow this application to make requests.

### Laravel CORS Configuration

Edit `config/cors.php`:

```php
<?php

return [
    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
        'auth/*',
        'oauth2/*',
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:5173',              // Development
        'https://auth.cerberus-iam.com',      // Production
        'https://staging-auth.cerberus-iam.com', // Staging
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,  // CRITICAL: Must be true
];
```

### Important CORS Settings

- **`supports_credentials: true`**: **Required** for session-based authentication
- **`allowed_origins`**: Add all environments where this app is hosted
- **`paths`**: Include all API endpoints this app will call

### Session Configuration for CORS

Edit `.env` on your Cerberus IAM API:

```env
SESSION_DRIVER=cookie
SESSION_DOMAIN=.cerberus-iam.com  # Note the leading dot
SESSION_SECURE_COOKIE=true        # Use true in production
SESSION_SAME_SITE=none            # Required for cross-domain
```

### Verifying CORS

Test CORS configuration:

```bash
curl -X OPTIONS http://api.cerberus-iam.com/api/auth/login \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

Look for these headers in the response:

```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: POST, OPTIONS
```

---

## Security

### Built-in Security Features

#### 1. CSRF Protection

- Automatically fetches CSRF tokens before state-changing requests
- Tokens are stored in HttpOnly cookies
- Validated on the server side

#### 2. Protected Routes

```typescript
// Login page requires OAuth redirect_uri
<ProtectedRoute requireOAuthRedirect={true}>
  <Login />
</ProtectedRoute>
```

#### 3. Credentials Include

All API requests include credentials:

```typescript
axios.defaults.withCredentials = true;
```

#### 4. XSS Prevention

- React's built-in XSS protection
- TypeScript type safety
- Input sanitization

#### 5. Secure Session Management

- HttpOnly cookies prevent JavaScript access
- Secure flag ensures HTTPS-only transmission
- SameSite=None for cross-domain support

### Security Best Practices

✅ **DO**:

- Always use HTTPS in production
- Rotate secrets regularly
- Implement rate limiting on API
- Use strong password policies
- Enable 2FA for privileged accounts
- Keep dependencies updated
- Monitor for security vulnerabilities

❌ **DON'T**:

- Hardcode secrets or API keys
- Disable CSRF protection
- Allow weak passwords
- Store sensitive data in localStorage
- Ignore security warnings

### Content Security Policy

Add these headers in your hosting platform:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://api.cerberus-iam.com;
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

---

## Building for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

**Output**:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── vite.svg
```

### Build Optimization

The build process includes:

- **Tree Shaking**: Removes unused code
- **Minification**: Compresses JavaScript and CSS
- **Code Splitting**: Separates vendor and app code
- **Asset Optimization**: Compresses images and fonts
- **Source Maps**: Generated for debugging (optional)

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally at `http://localhost:4173`

### Build Configuration

Edit `vite.config.ts` to customize build settings:

```typescript
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true, // Enable source maps
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'axios'],
        },
      },
    },
  },
});
```

---

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**:

```bash
npm i -g vercel
```

2. **Login and Deploy**:

```bash
vercel login
vercel --prod
```

3. **Set Environment Variables**:

```bash
vercel env add VITE_API_URL production
# Enter: https://api.cerberus-iam.com
```

4. **Automatic Deployments**:
   - Connect your GitHub repository
   - Vercel auto-deploys on push to main

### Netlify

1. **Install Netlify CLI**:

```bash
npm i -g netlify-cli
```

2. **Build and Deploy**:

```bash
npm run build
netlify deploy --prod --dir=dist
```

3. **Environment Variables**:
   - Go to Site settings > Environment variables
   - Add `VITE_API_URL`

### Traditional Hosting (Apache/Nginx)

1. **Build the Application**:

```bash
npm run build
```

2. **Upload `dist/` folder** to your web server

3. **Configure Web Server**:

**Nginx**:

```nginx
server {
    listen 80;
    server_name auth.cerberus-iam.com;

    root /var/www/cerberus-auth-ui/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

**Apache** (`.htaccess`):

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header set X-Frame-Options "DENY"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

### Docker Deployment

**Dockerfile**:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build and Run**:

```bash
docker build -t cerberus-auth-ui .
docker run -p 8080:80 -e VITE_API_URL=https://api.cerberus-iam.com cerberus-auth-ui
```

---

## Troubleshooting

### Common Issues

#### Issue: "Access Denied" Page Always Shows

**Cause**: Accessing `/login` without OAuth redirect_uri parameter.

**Solution**: This is expected behavior. The login page must be accessed through an OAuth flow with a `redirect_uri` parameter.

**Test**:

```
http://localhost:5173/login?redirect_uri=/oauth2/authorize
```

---

#### Issue: CORS Errors in Browser Console

**Symptoms**:

```
Access to XMLHttpRequest at 'https://api.cerberus-iam.com/api/auth/login'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution**:

1. Check `config/cors.php` on API includes `http://localhost:5173`
2. Ensure `supports_credentials` is `true`
3. Verify API is running and accessible

---

#### Issue: Login Fails with "Invalid Credentials"

**Possible Causes**:

1. Incorrect email/password
2. API endpoint not implemented correctly
3. Session not being created on API

**Debug Steps**:

```bash
# Test API directly
curl -X POST https://api.cerberus-iam.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

---

#### Issue: "Cannot read property 'data' of undefined"

**Cause**: API response doesn't match expected format.

**Solution**: Ensure API returns:

```json
{
  "success": true,
  "user": { ... }
}
```

---

#### Issue: Build Fails with TypeScript Errors

**Solution**:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

### Debug Mode

Enable debug logging:

```typescript
// src/lib/api.ts
api.interceptors.request.use((config) => {
  console.log('Request:', config.method?.toUpperCase(), config.url);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);
```

---

## Contributing

### Development Workflow

1. **Create a Feature Branch**:

```bash
git checkout -b feature/your-feature-name
```

2. **Make Changes**: Follow the existing code style and patterns

3. **Test Thoroughly**:

```bash
npm run dev        # Manual testing
npm run build      # Ensure build works
```

4. **Commit Changes**:

```bash
git add .
git commit -m "feat: add your feature description"
```

5. **Push and Create PR**:

```bash
git push origin feature/your-feature-name
```

### Code Style Guidelines

- Use TypeScript for all new files
- Follow existing component patterns
- Add JSDoc comments for complex functions
- Use meaningful variable names
- Keep components small and focused

### Commit Message Format

```
type(scope): subject

body

footer
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples**:

```
feat(login): add remember me checkbox
fix(api): handle 500 errors gracefully
docs(readme): update CORS configuration section
```

---

## Technologies

### Core Framework

- **[React 18](https://react.dev/)**: UI library with hooks and concurrent features
- **[TypeScript 5](https://www.typescriptlang.org/)**: Type-safe JavaScript
- **[Vite 7](https://vitejs.dev/)**: Next-generation frontend tooling

### Routing & State

- **[React Router 6](https://reactrouter.com/)**: Declarative routing
- **React Context API**: Global state management

### HTTP & API

- **[Axios](https://axios-http.com/)**: Promise-based HTTP client
- **Custom Interceptors**: CSRF token management

### Styling & UI

- **[Tailwind CSS 4](https://tailwindcss.com/)**: Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)**: Re-usable component library
- **[Lucide React](https://lucide.dev/)**: Beautiful icon library
- **[class-variance-authority](https://cva.style/)**: Component variants
- **[clsx](https://github.com/lukeed/clsx)**: Conditional classnames
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)**: Merge Tailwind classes

### Development Tools

- **[ESLint](https://eslint.org/)**: Code linting
- **[TypeScript ESLint](https://typescript-eslint.io/)**: TypeScript-specific linting
- **[PostCSS](https://postcss.org/)**: CSS transformation
- **[Autoprefixer](https://github.com/postcss/autoprefixer)**: Vendor prefixes

---

## License

**Private - Cerberus IAM Project**

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

© 2025 Cerberus IAM. All rights reserved.

---

## Support

For questions, issues, or contributions:

- **Documentation**: See `SETUP.md` for quick start guide
- **Issues**: Create an issue in the repository
- **Email**: <support@cerberus-iam.com> (if applicable)

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

[⬆ Back to Top](#cerberus-iam-authentication-ui)

</div>
