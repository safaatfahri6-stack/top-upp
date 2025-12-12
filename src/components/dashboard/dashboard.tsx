import Header from './header';
import BalanceCard from './balance-card';
import TopUpOptions from './topup-options';
import TransactionHistory from './transaction-history';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid gap-8 max-w-4xl mx-auto">
          <BalanceCard />
          <TopUpOptions />
          <TransactionHistory />
        </div>
      </main>
    </div>
  );
}
