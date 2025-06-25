import React from 'react';
import SavingsPotCard from '@/components/SavingsPotCard';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PieChart, TrendingUp, Sparkles } from 'lucide-react';

// Mock data for the savings pots
const mockSavingsPots = [
  {
    id: 'pot1',
    icon: 'gamepad-2',
    name: "New Console",
    currentAmount: 150,
    targetAmount: 499,
  },
  {
    id: 'pot2',
    icon: 'bike',
    name: "Mountain Bike",
    currentAmount: 320,
    targetAmount: 700,
  },
  {
    id: 'pot3',
    icon: 'graduation-cap',
    name: "University Fund",
    currentAmount: 950,
    targetAmount: 5000,
  },
];

interface EvolvingDashboardWidgetProps {
  /** The age of the youth user, used to determine which UI to display. */
  userAge: number;
}

const EvolvingDashboardWidget: React.FC<EvolvingDashboardWidgetProps> = ({ userAge }) => {
  console.log(`EvolvingDashboardWidget loaded for user age: ${userAge}`);

  // Define the content for younger users (e.g., under 16)
  const YoungerUserContent = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {mockSavingsPots.map((pot) => (
        <SavingsPotCard
          key={pot.id}
          id={pot.id}
          icon={pot.icon as any} // Assuming SavingsPotCard handles icon names
          name={pot.name}
          currentAmount={pot.currentAmount}
          targetAmount={pot.targetAmount}
        />
      ))}
    </div>
  );

  // Define the content for older users (e.g., 16 and over)
  const OlderUserContent = () => (
    <div className="space-y-4">
      <Alert>
        <PieChart className="h-4 w-4" />
        <AlertTitle className="font-semibold">Your Financial Snapshot</AlertTitle>
        <AlertDescription>
          Coming soon: A detailed breakdown of your spending habits to help you budget better.
        </AlertDescription>
      </Alert>
      <Alert>
        <TrendingUp className="h-4 w-4" />
        <AlertTitle className="font-semibold">First Investment Goals</AlertTitle>
        <AlertDescription>
          Get ready to learn about investing. We'll guide you through the basics when you're ready.
        </AlertDescription>
      </Alert>
      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
        <Sparkles className="h-4 w-4 text-blue-500" />
        <AlertTitle className="text-blue-800 dark:text-blue-300 font-semibold">Preparing for 18</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-400">
          Your account will evolve with you. We're preparing new features for your transition to financial independence!
        </AlertDescription>
      </Alert>
    </div>
  );

  return (
    <section aria-label="Dashboard Content">
      {userAge < 16 ? <YoungerUserContent /> : <OlderUserContent />}
    </section>
  );
};

export default EvolvingDashboardWidget;