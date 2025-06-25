import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Components
import AppHeader from '@/components/layout/AppHeader';
import ParentalControlModule from '@/components/ParentalControlModule';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const OnboardingFlow = () => {
  console.log('OnboardingFlow loaded');
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    childName: '',
    childDob: '',
    allowance: { enabled: true, amount: 10 },
  });

  const totalSteps = 4;
  const progressPercentage = (step / totalSteps) * 100;

  useEffect(() => {
    // This effect can be used to load data or perform actions on step change
    console.log(`Current onboarding step: ${step}`);
  }, [step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = () => {
    console.log("Submitting Onboarding Data:", formData);
    // In a real app, you would send this data to a server
    setIsDialogOpen(true);
  };
  
  const handleNavigateToDashboard = () => {
    // Navigate to the parental dashboard as defined in App.tsx
    navigate('/parental-dashboard');
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Parent Details
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Parent's Information</CardTitle>
              <CardDescription>Let's start by verifying your identity. Please enter your details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parentName">Full Name</Label>
                <Input id="parentName" name="parentName" placeholder="e.g., Jane Doe" value={formData.parentName} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentEmail">Email Address</Label>
                <Input id="parentEmail" name="parentEmail" type="email" placeholder="e.g., jane.doe@example.com" value={formData.parentEmail} onChange={handleInputChange} />
              </div>
              <div className="text-center p-4 border-2 border-dashed rounded-lg">
                <p className="text-sm text-muted-foreground">Identity verification step would appear here.</p>
                <Button variant="outline" className="mt-2">Upload ID</Button>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleNext}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </CardFooter>
          </Card>
        );
      case 2: // Child Details
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Child's Details</CardTitle>
              <CardDescription>Now, let's create a profile for your child.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="childName">Child's Full Name</Label>
                <Input id="childName" name="childName" placeholder="e.g., John Doe" value={formData.childName} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childDob">Date of Birth</Label>
                <Input id="childDob" name="childDob" type="date" value={formData.childDob} onChange={handleInputChange} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
              <Button onClick={handleNext}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </CardFooter>
          </Card>
        );
      case 3: // Set Controls
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Initial Account Controls</CardTitle>
              <CardDescription>Set a starting weekly allowance. You can change this anytime.</CardDescription>
            </CardHeader>
            <CardContent>
              <ParentalControlModule
                label="Weekly Allowance"
                description="Set a weekly pocket money amount."
                maxValue={50}
                initialValue={formData.allowance.amount}
                onValueChange={(value) => setFormData(prev => ({...prev, allowance: value}))}
                unit="£"
                step={1}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
              <Button onClick={handleNext}>Review Details <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </CardFooter>
          </Card>
        );
      case 4: // Summary
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Confirm Details</CardTitle>
              <CardDescription>Please review all the information before creating the account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between p-2 rounded bg-muted"><strong>Parent Name:</strong> <span>{formData.parentName}</span></div>
                <div className="flex justify-between p-2 rounded bg-muted"><strong>Parent Email:</strong> <span>{formData.parentEmail}</span></div>
                <div className="flex justify-between p-2 rounded bg-muted"><strong>Child Name:</strong> <span>{formData.childName}</span></div>
                <div className="flex justify-between p-2 rounded bg-muted"><strong>Child D.O.B:</strong> <span>{formData.childDob}</span></div>
                <div className="flex justify-between p-2 rounded bg-muted"><strong>Weekly Allowance:</strong> <span>£{formData.allowance.amount.toFixed(2)}</span></div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">Confirm & Create Account</Button>
            </CardFooter>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <AppHeader title="Create Account" />
        <main className="flex-1 container mx-auto max-w-2xl flex flex-col items-center justify-center p-4">
          <div className="w-full space-y-4">
            <Progress value={progressPercentage} className="w-full" />
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account Created Successfully!</DialogTitle>
            <DialogDescription>
              Welcome to GrowBank! You can now manage your child's account from the parental dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleNavigateToDashboard} className="w-full">
              Go to Parental Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OnboardingFlow;