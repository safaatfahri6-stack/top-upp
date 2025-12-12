"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { PlusCircle, Loader2 } from 'lucide-react';

const topUpAmounts = [50000, 100000, 200000, 500000];

export default function TopUpOptions() {
  const { addTopUp } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTopUp = async () => {
    if (selectedAmount) {
      setIsProcessing(true);
      await addTopUp(selectedAmount);
      setIsProcessing(false);
      setIsDialogOpen(false);
      setSelectedAmount(null);
    }
  };

  const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Top Up Your Balance</CardTitle>
        <CardDescription>Choose an amount to add to your balance.</CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topUpAmounts.map((amount) => (
              <AlertDialogTrigger asChild key={amount}>
                <Button 
                  variant="outline"
                  className="h-24 flex-col text-lg font-semibold hover:bg-primary/10 hover:border-primary"
                  onClick={() => setSelectedAmount(amount)}
                >
                  {formatCurrency(amount)}
                </Button>
              </AlertDialogTrigger>
            ))}
          </div>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Top-Up</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to add {selectedAmount ? formatCurrency(selectedAmount) : ''} to your balance?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleTopUp} disabled={isProcessing} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Confirm
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
