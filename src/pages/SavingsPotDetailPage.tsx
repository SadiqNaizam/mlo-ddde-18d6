import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import BottomNavBar from '@/components/layout/BottomNavBar';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Third-party Libraries
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ArrowLeft, PiggyBank, Plus, Gamepad2, Bike, GraduationCap } from 'lucide-react';

// Mock data simulating what might be fetched from a database
const mockPotsData = [
  {
    id: 'pot1',
    name: "New Console",
    icon: Gamepad2,
    currentAmount: 150,
    targetAmount: 499,
    history: [
      { date: 'Jan', amount: 20 },
      { date: 'Feb', amount: 50 },
      { date: 'Mar', amount: 30 },
      { date: 'Apr', amount: 50 },
    ],
  },
  {
    id: 'pot2',
    name: "Mountain Bike",
    icon: Bike,
    currentAmount: 320,
    targetAmount: 700,
    history: [
      { date: 'Jan', amount: 100 },
      { date: 'Feb', amount: 80 },
      { date: 'Mar', amount: 70 },
      { date: 'Apr', amount: 70 },
    ],
  },
  {
    id: 'pot3',
    name: "University Fund",
    icon: GraduationCap,
    currentAmount: 950,
    targetAmount: 5000,
    history: [
      { date: 'Jan', amount: 200 },
      { date: 'Feb', amount: 250 },
      { date: 'Mar', amount: 250 },
      { date: 'Apr', amount: 250 },
    ],
  },
];

const SavingsPotDetailPage = () => {
  console.log('SavingsPotDetailPage loaded');
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState('');
  const [progress, setProgress] = useState(0);

  // Find the pot data based on the ID passed in navigation state
  const potId = location.state?.potId;
  const potData = mockPotsData.find(p => p.id === potId);

  useEffect(() => {
    // If no pot data is found (e.g., direct navigation), redirect to the dashboard
    if (!potData) {
      navigate('/youth-dashboard');
      return;
    }

    // Animate progress bar on load
    const progressPercentage = potData.targetAmount > 0 ? (potData.currentAmount / potData.targetAmount) * 100 : 0;
    const timer = setTimeout(() => setProgress(progressPercentage), 300);
    return () => clearTimeout(timer);
  }, [potData, navigate]);

  if (!potData) {
    // Render nothing while redirecting
    return null;
  }
  
  const handleAddMoney = () => {
      // In a real app, this would trigger an API call.
      // Here, we just log it and close the dialog.
      console.log(`Adding £${amountToAdd} to ${potData.name}`);
      setAmountToAdd('');
      setDialogOpen(false);
  }

  const PotIcon = potData.icon || PiggyBank;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* App Header with a back button */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex-1">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Go back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 text-center">
            <h1 className="truncate text-lg font-bold">{potData.name}</h1>
          </div>
          <div className="flex-1"></div>
        </div>
      </header>
      
      <main className="flex-1 p-4 sm:p-6 space-y-6">
        {/* Savings Goal Progress Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="w-full max-w-lg mx-auto overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4 bg-gray-50 p-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <PotIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">{potData.name}</CardTitle>
                        <CardDescription>Your progress towards this goal</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                    <div className="text-center space-y-2">
                        <span className="text-4xl font-bold text-gray-800">
                            {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(potData.currentAmount)}
                        </span>
                        <p className="text-sm text-muted-foreground">
                            saved of {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(potData.targetAmount)} goal
                        </p>
                    </div>
                    <Progress value={progress} className="h-3" />
                     <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="lg" className="w-full mt-4">
                                <Plus className="mr-2 h-5 w-5" />
                                Add Money
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add to "{potData.name}"</DialogTitle>
                                <DialogDescription>
                                    How much would you like to add to this savings pot?
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="amount" className="text-right">
                                        Amount (£)
                                    </Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="e.g., 10.00"
                                        value={amountToAdd}
                                        onChange={(e) => setAmountToAdd(e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleAddMoney} disabled={!amountToAdd}>Confirm Contribution</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </motion.div>

        {/* Contribution History Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="w-full max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>Contribution History</CardTitle>
                    <CardDescription>Your savings activity for the last few months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[250px] w-full">
                         <ResponsiveContainer>
                            <BarChart data={potData.history} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `£${value}`} />
                                <ChartTooltip 
                                    cursor={false} 
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </motion.div>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default SavingsPotDetailPage;