import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, ArrowRightLeft, PiggyBank } from 'lucide-react';

const BottomNavBar: React.FC = () => {
  console.log('BottomNavBar loaded');

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-1 flex-col items-center justify-center gap-1 p-2 transition-colors ${
      isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary/90'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background">
      <div className="container mx-auto flex h-16 max-w-md items-stretch px-0">
        <NavLink to="/youth-dashboard" className={getNavLinkClass} end>
          <LayoutGrid className="h-5 w-5" />
          <span className="text-xs font-medium">Dashboard</span>
        </NavLink>
        <NavLink to="/transaction-history" className={getNavLinkClass}>
          <ArrowRightLeft className="h-5 w-5" />
          <span className="text-xs font-medium">Transactions</span>
        </NavLink>
        {/* 
          Note: The 'Savings' link points to the Youth Dashboard, as it's the primary hub 
          for viewing savings pots. The route `/savings-pot-detail` is for a specific pot,
          not a general savings page.
        */}
        <NavLink to="/youth-dashboard" className={getNavLinkClass}>
          <PiggyBank className="h-5 w-5" />
          <span className="text-xs font-medium">Savings</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavBar;