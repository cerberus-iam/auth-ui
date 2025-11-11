import { useState, useEffect, type FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2 } from 'lucide-react';
import { resolveAuthorizationRedirect } from '../lib/oauth';
import { AnimatedGradient } from '../components/AnimatedGradient';
import logoSvg from '../assets/logo.svg';

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
      await login(email, password);
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
      <div className="grid min-h-svh lg:grid-cols-2">
        {/* Left side - Animated Gradient */}
        <div className="relative hidden lg:block">
          <AnimatedGradient />
          <div className="relative z-10 flex h-full flex-col p-8">
            {/* Top-left branding */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center">
                <img
                  src={logoSvg}
                  alt="Cerberus IAM"
                  className="h-10 w-10"
                  style={{ color: '#FCBE21' }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-white">
                  Cerberus IAM
                </span>
                <span className="text-sm text-slate-300">
                  Secure authentication
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Loading */}
        <div className="bg-background flex items-center justify-center p-6 md:p-10">
          <div className="flex w-full max-w-sm flex-col gap-6">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left side - Animated Gradient */}
      <div className="relative hidden lg:block">
        <AnimatedGradient />
        <div className="relative z-10 flex h-full flex-col p-8">
          {/* Top-left branding */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center">
              <img
                src={logoSvg}
                alt="Cerberus IAM"
                className="h-10 w-10"
                style={{ color: '#FCBE21' }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-white">
                Cerberus IAM
              </span>
              <span className="text-sm text-slate-300">
                Secure authentication
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="bg-background flex items-center justify-center p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          {/* Mobile logo */}
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium lg:hidden"
          >
            <div className="flex h-6 w-6 items-center justify-center">
              <img
                src={logoSvg}
                alt="Cerberus IAM"
                className="h-6 w-6"
                style={{ color: '#FCBE21' }}
              />
            </div>
            Cerberus IAM
          </a>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your email below to login to your account
              </p>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-6">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
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
              <Button type="submit" className="w-full" disabled={isSubmitting}>
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
            <div className="text-muted-foreground text-center text-sm">
              Secured by Cerberus IAM
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
