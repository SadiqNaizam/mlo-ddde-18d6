import React, { useState, useEffect } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import BottomNavBar from '@/components/layout/BottomNavBar';
import EvolvingDashboardWidget from '@/components/EvolvingDashboardWidget';
import GraduationCelebrationAnimator from '@/components/GraduationCelebrationAnimator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const YouthDashboard = () => {
  // State to manage the user's age and the graduation animation trigger
  const [userAge, setUserAge] = useState(14);
  const [showGraduation, setShowGraduation] = useState(false);

  useEffect(() => {
    console.log('YouthDashboard loaded');
    // Check if the user is 18 to trigger the graduation flow automatically
    // This is a simulation for demonstration. In a real app, this would be based on user data.
    if (userAge >= 18) {
      setShowGraduation(true);
    }
  }, [userAge]);

  const handleGraduationComplete = () => {
    console.log("Graduation complete! Hiding animator and keeping user on the new dashboard.");
    setShowGraduation(false);
  };
  
  // A simple function to simulate the user aging to 18 to trigger the animation
  const simulateTurning18 = () => {
    setUserAge(18);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* The Graduation Animator is a full-screen overlay, conditionally rendered */}
      {showGraduation && (
        <GraduationCelebrationAnimator 
          userName="Alex" 
          onComplete={handleGraduationComplete} 
        />
      )}

      <AppHeader title="My Dashboard" />

      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Main Account Balance Card */}
          <section aria-labelledby="balance-heading">
            <Card className="bg-gradient-to-tr from-primary to-blue-600 text-primary-foreground shadow-lg">
              <CardHeader>
                <CardTitle id="balance-heading" className="text-sm font-medium text-blue-100">
                  Main Account Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold tracking-tight">£245.50</p>
                <p className="text-xs text-blue-200 mt-1">+£10.00 this week</p>
              </CardContent>
            </Card>
          </section>

          {/* Evolving Dashboard Content */}
          <section aria-labelledby="dashboard-content-heading">
            <h2 id="dashboard-content-heading" className="text-xl font-bold text-gray-800 mb-3">
              {userAge < 16 ? "Your Savings Pots" : "Your Financial Tools"}
            </h2>
            <EvolvingDashboardWidget userAge={userAge} />
          </section>

          {/* DEMO-ONLY: Controls to simulate user aging */}
          {userAge < 18 && (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                  <CardTitle className="text-base">Developer Demo</CardTitle>
                  <CardDescription>Simulate the user's 18th birthday to see the account graduation flow.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Button onClick={simulateTurning18}>
                    Simulate Turning 18
                  </Button>
              </CardContent>
            </Card>
          )}

        </motion.div>
      </main>
      
      <BottomNavBar />
    </div>
  );
};

export default YouthDashboard;