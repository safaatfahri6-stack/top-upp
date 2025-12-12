"use client";

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wallet2 } from 'lucide-react';

export default function BalanceCard() {
  const { balance } = useAuth();
  
  const formattedBalance = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(balance);

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
        <Wallet2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold font-headline">{formattedBalance}</div>
        <CardDescription className="text-xs text-muted-foreground pt-1">
          Your available funds for topping up.
        </CardDescription>
      </CardContent>
    </Card>
  );
}
