import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GoogleSignInButton from '@/components/auth/google-sign-in-button';
import { Wallet } from 'lucide-react';

export default function LoginView() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary mb-4">
            <Wallet className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="font-headline text-3xl font-bold">Welcome to TopUpGo</CardTitle>
          <CardDescription>Sign in to manage your balance and top up.</CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleSignInButton />
        </CardContent>
      </Card>
    </div>
  );
}
