import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import BottomNavBar from '@/components/layout/BottomNavBar';
import ParentalControlModule from '@/components/ParentalControlModule';

// Shadcn/ui Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

// Mock data for the children's accounts
const mockChildren = [
  {
    id: 'child1',
    name: 'Alex',
    initials: 'A',
    balance: 125.50,
    allowance: 10,
    spendingLimit: 50,
    avatarUrl: 'https://i.pravatar.cc/150?u=alex'
  },
  {
    id: 'child2',
    name: 'Chloe',
    initials: 'C',
    balance: 78.00,
    allowance: 5,
    spendingLimit: 30,
    avatarUrl: 'https://i.pravatar.cc/150?u=chloe'
  },
];

const ParentalDashboard = () => {
  console.log('ParentalDashboard loaded');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <AppHeader title="Parental Dashboard" />

      <main className="flex-1 container max-w-2xl mx-auto px-4 py-6 pb-24">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Accounts</h2>
          {/* The onboarding flow is the entry point for adding new users */}
          <Button asChild variant="ghost" className="text-primary hover:text-primary">
            <Link to="/">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Child
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {mockChildren.map((child) => (
            <Card key={child.id} className="w-full shadow-md overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 bg-slate-100 p-4">
                <Avatar className="h-12 w-12 border-2 border-white">
                  <AvatarImage src={child.avatarUrl} alt={child.name} />
                  <AvatarFallback>{child.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{child.name}</CardTitle>
                  <CardDescription className="font-semibold text-green-600">
                    Balance: {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(child.balance)}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-4">
                <ParentalControlModule
                  label="Weekly Allowance"
                  description="Set a fixed weekly pocket money amount."
                  maxValue={20}
                  step={1}
                  initialValue={child.allowance}
                  unit="£"
                  onValueChange={(value) => console.log(`${child.name}'s allowance changed:`, value)}
                />
                <ParentalControlModule
                  label="Card Spending Limit"
                  description="Set a total weekly spending limit for the card."
                  maxValue={100}
                  step={5}
                  initialValue={child.spendingLimit}
                  unit="£"
                  onValueChange={(value) => console.log(`${child.name}'s spending limit changed:`, value)}
                />
              </CardContent>

              <CardFooter className="bg-slate-50 p-4 flex justify-end">
                <Button asChild>
                  {/* Link to the transaction history page as defined in App.tsx */}
                  <Link to="/transaction-history" state={{ childId: child.id }}>
                    View Transactions
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default ParentalDashboard;