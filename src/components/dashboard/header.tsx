import { Wallet } from 'lucide-react';
import UserNav from './user-nav';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold font-headline text-foreground">TopUpGo</h1>
        </div>
        <UserNav />
      </div>
    </header>
  );
}
