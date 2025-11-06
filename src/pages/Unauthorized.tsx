import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10">
              <ShieldAlert className="h-6 w-6 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Access Denied</CardTitle>
          <CardDescription className="text-center">
            This page can only be accessed through an OAuth authorization flow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center mb-4">
            If you believe this is an error, please contact your system administrator.
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
