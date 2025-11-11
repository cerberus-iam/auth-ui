import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  requireOAuthRedirect?: boolean;
}

export default function ProtectedRoute({
  children,
  requireOAuthRedirect = false,
}: ProtectedRouteProps) {
  const location = useLocation();

  // Check if there's an OAuth redirect_uri parameter
  const params = new URLSearchParams(location.search);
  const hasRedirectUri = params.has('redirect_uri');

  // If this route requires OAuth redirect and it's not present, show unauthorized
  if (requireOAuthRedirect && !hasRedirectUri) {
    let returnUrl: string | undefined;

    if (typeof window !== 'undefined') {
      const candidates = [
        document.referrer,
        params.get('redirect_uri'),
        window.location.href,
      ];

      for (const candidate of candidates) {
        if (!candidate) continue;
        try {
          returnUrl = new URL(candidate, window.location.href).origin;
          if (returnUrl) break;
        } catch {
          // Ignore malformed URLs and continue searching for a usable origin
        }
      }

      if (!returnUrl) {
        returnUrl = window.location.origin;
      }

      try {
        window.sessionStorage.setItem('unauthorizedReturnTo', returnUrl);
      } catch {
        // Access to sessionStorage can fail (e.g., disabled storage); ignore gracefully
      }
    }

    return (
      <Navigate
        to="/unauthorized"
        state={returnUrl ? { from: returnUrl } : undefined}
        replace
      />
    );
  }

  return <>{children}</>;
}
