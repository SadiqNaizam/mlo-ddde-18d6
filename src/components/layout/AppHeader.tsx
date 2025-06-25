import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, User } from 'lucide-react';

interface AppHeaderProps {
  title: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  console.log('AppHeader loaded');

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left-aligned placeholder for a potential back button or menu icon */}
        <div className="flex-1"></div>

        <div className="flex-1 text-center">
          <h1 className="truncate text-lg font-bold">{title}</h1>
        </div>

        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Profile">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;