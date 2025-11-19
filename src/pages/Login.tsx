import { useState, useEffect, type FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2 } from 'lucide-react';
import { resolveAuthorizationRedirect } from '../lib/oauth';
import { Logo } from '../components/Logo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, isLoading, checkAuth } = useAuth();

  useEffect(() => {
    // Parse OAuth parameters from URL
    const params = new URLSearchParams(window.location.search);
    const redirectUri = params.get('redirect_uri');

    // Store OAuth params in localStorage for after login
    if (redirectUri) {
      localStorage.setItem('oauth_redirect', redirectUri);

      // Extract client_id from the redirect_uri for OAuth flows
      try {
        const redirectUrl = new URL(redirectUri);
        const clientId = redirectUrl.searchParams.get('client_id');
        if (clientId) {
          localStorage.setItem('oauth_client_id', clientId);
        }
      } catch {
        // Invalid URL, ignore
      }
    }

    // If already authenticated and has OAuth redirect, go there immediately
    if (isAuthenticated && redirectUri) {
      window.location.href = resolveAuthorizationRedirect(redirectUri);
    }
  }, [isAuthenticated]);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Get client_id from localStorage if it exists (OAuth flow)
      const clientId = localStorage.getItem('oauth_client_id');
      await login(email, password, clientId || undefined);
      // Login function will handle redirect to OAuth endpoint
    } catch (err: unknown) {
      setError(
        (isAxiosError(err) && (err.response?.data?.message || err.message)) ||
          (err instanceof Error && err.message) ||
          'Login failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="bg-muted flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <Logo className="mb-2 size-12" color="#FCBE21" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl font-semibold">Cerberus IAM</span>
            <span className="text-muted-foreground text-sm">
              Secure authentication
            </span>
          </div>
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    autoComplete="email"
                    autoFocus
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                    autoComplete="current-password"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </div>
              <div className="text-muted-foreground mt-4 text-center text-sm">
                Secured by Cerberus IAM
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
