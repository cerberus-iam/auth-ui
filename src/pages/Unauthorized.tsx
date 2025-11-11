import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <div className="mb-2 flex items-center justify-center">
            <div className="bg-destructive/10 flex h-12 w-12 items-center justify-center rounded-full">
              <ShieldAlert className="text-destructive h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Access Denied</CardTitle>
          <CardDescription className="text-center">
            This page can only be accessed through an OAuth authorization flow.
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
            onClick={() => (window.location.href = "/")}
          >
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
