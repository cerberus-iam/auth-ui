import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { Logo } from '../components/Logo';

export default function Unauthorized() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Logo className="h-12 w-12" color="#FCBE21" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl font-semibold">Cerberus IAM</span>
            <span className="text-muted-foreground text-sm">
              Secure authentication
            </span>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-3">
            <div className="mb-2 flex items-center justify-center">
              <div className="bg-destructive/10 flex h-12 w-12 items-center justify-center rounded-full">
                <ShieldAlert className="text-destructive h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">
              Access Denied
            </CardTitle>
            <CardDescription className="text-center">
              This page can only be accessed through an OAuth authorization
              flow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-center text-sm">
              If you believe this is an error, please contact your system
              administrator.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => (window.location.href = '/')}
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
