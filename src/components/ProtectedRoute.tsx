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
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
