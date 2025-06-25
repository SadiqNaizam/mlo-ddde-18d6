import React, { useState, useMemo } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import BottomNavBar from '@/components/layout/BottomNavBar';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data representing a user's transaction history
const mockTransactions = [
  { id: '1', date: '2024-07-28', description: 'Pocket Money', amount: 10.00, type: 'income', category: 'Allowance' },
  { id: '2', date: '2024-07-27', description: 'Odeon Cinema', amount: -7.50, type: 'expense', category: 'Entertainment' },
  { id: '3', date: '2024-07-26', description: 'WHSmith', amount: -4.99, type: 'expense', category: 'Shopping' },
  { id: '4', date: '2024-07-25', description: 'Gift from Grandma', amount: 20.00, type: 'income', category: 'Gift' },
  { id: '5', date: '2024-07-24', description: 'Tesco Express', amount: -3.20, type: 'expense', category: 'Groceries' },
  { id: '6', date: '2024-07-21', description: 'Pocket Money', amount: 10.00, type: 'income', category: 'Allowance' },
  { id: '7', date: '2024-07-20', description: 'Game Store Top-up', amount: -15.00, type: 'expense', category: 'Gaming' },
  { id: '8', date: '2024-07-19', description: 'McDonald\'s', amount: -6.40, type: 'expense', category: 'Food' },
  { id: '9', date: '2024-07-18', description: 'Bus Fare', amount: -1.50, type: 'expense', category: 'Transport' },
  { id: '10', date: '2024-07-17', description: 'Waterstones', amount: -8.99, type: 'expense', category: 'Shopping' },
];

const TransactionHistoryPage = () => {
  console.log('TransactionHistoryPage loaded');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = useMemo(() => {
    if (!searchTerm) {
      return mockTransactions;
    }
    return mockTransactions.filter(
      (t) =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader title="Transactions" />

      <main className="flex-1 pb-20"> {/* Padding bottom to avoid overlap with BottomNavBar */}
        <div className="container max-w-md mx-auto p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search transactions..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-160px)]"> {/* Adjust height based on header/search bar */}
            <div className="container max-w-md mx-auto px-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <span>{transaction.date}</span>
                            <Badge variant="outline">{transaction.category}</Badge>
                          </div>
                        </TableCell>
                        <TableCell className={cn(
                          "text-right font-semibold",
                          transaction.type === 'income' ? 'text-green-600' : 'text-gray-800'
                        )}>
                          {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                        <TableCell colSpan={2} className="text-center text-muted-foreground py-10">
                            No transactions found.
                        </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
        </ScrollArea>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default TransactionHistoryPage;