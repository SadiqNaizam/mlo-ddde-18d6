import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from 'react-router-dom';
import { PiggyBank, type LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the props for the SavingsPotCard
interface SavingsPotCardProps {
  /** A unique identifier for the savings pot, used for navigation. */
  id: string;
  /** The name or title of the savings goal. */
  name: string;
  /** The current amount saved. */
  currentAmount: number;
  /** The target amount for the savings goal. */
  targetAmount: number;
  /** A React component to be used as the icon, e.g., from lucide-react. */
  Icon?: React.ComponentType<LucideProps>;
  /** Optional additional class names for custom styling. */
  className?: string;
}

const SavingsPotCard: React.FC<SavingsPotCardProps> = ({
  id,
  name,
  currentAmount,
  targetAmount,
  Icon = PiggyBank,
  className,
}) => {
  console.log(`SavingsPotCard loaded for: ${name}`);

  const [progress, setProgress] = useState(0);

  // Calculate the progress percentage, ensuring it doesn't exceed 100
  const progressPercentage = targetAmount > 0 ? Math.min((currentAmount / targetAmount) * 100, 100) : 0;

  // Animate the progress bar on component mount for a gamified feel
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(progressPercentage);
    }, 300); // Small delay to make the animation noticeable
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  return (
    <Link to="/savings-pot-detail" state={{ potId: id }} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg block">
      <Card 
        className={cn(
          "w-full bg-gradient-to-br from-blue-50 to-purple-50 p-4 border-2 border-gray-100 hover:border-blue-400 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer", 
          className
        )}
      >
        <CardContent className="p-2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-2 shadow-sm">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-800 truncate">{name}</h3>
          </div>

          <div className="space-y-2 text-center">
             <div className="flex justify-between items-end text-sm">
                <span className="font-semibold text-gray-700">
                    {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(currentAmount)}
                </span>
                <span className="text-xs text-gray-500">
                    Goal: {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(targetAmount)}
                </span>
             </div>
             <Progress value={progress} className="h-3" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SavingsPotCard;