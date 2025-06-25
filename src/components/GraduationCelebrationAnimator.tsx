import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PartyPopper, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GraduationCelebrationAnimatorProps {
  userName: string;
  onComplete: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const stepVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const ConfettiPiece = ({ x, delay, duration, rotation }: { x: string, delay: number, duration: number, rotation: number }) => (
  <motion.div
    className="absolute top-0 text-yellow-400"
    style={{ x, left: x }}
    initial={{ y: '-20vh', opacity: 0 }}
    animate={{ y: '120vh', opacity: [1, 1, 0], rotate: rotation }}
    transition={{ duration, delay, ease: 'linear', repeat: Infinity, repeatDelay: 2 }}
  >
    <Star className="h-4 w-4 fill-current" />
  </motion.div>
);

const GraduationCelebrationAnimator: React.FC<GraduationCelebrationAnimatorProps> = ({ userName, onComplete }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log('GraduationCelebrationAnimator loaded');
  }, []);

  useEffect(() => {
    const newProgress = (step / 3) * 100;
    setProgress(newProgress);
  }, [step]);

  const handleNextStep = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    }
  };

  const handleFinish = () => {
    handleNextStep();
    // onComplete might be used by parent to remove this component from the tree
    // We navigate via the Link component
  };

  const confettiPieces = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    rotation: Math.random() * 360,
  }));

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div key="step0" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
            <PartyPopper className="mx-auto h-24 w-24 text-primary animate-bounce" />
            <h1 className="text-4xl font-bold mt-6">Happy 18th Birthday, {userName}!</h1>
            <p className="text-muted-foreground mt-4 text-lg">A new chapter of your financial journey begins today.</p>
            <Button size="lg" className="mt-8" onClick={handleNextStep}>
              Let's Celebrate <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        );
      case 1:
        return (
          <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
            <Card className="w-full max-w-md text-left">
              <CardHeader>
                <CardTitle className="text-2xl">Your Account is Graduating!</CardTitle>
                <CardDescription>Here’s what’s new as you take full control:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>No more parental controls or spending limits.</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Access to adult features like overdrafts & investments.</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Your savings pots are now fully yours to manage.</span>
                </div>
                <Button size="lg" className="w-full mt-4" onClick={handleNextStep}>
                  Sounds Good!
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
            <h1 className="text-3xl font-bold">Ready for the final step?</h1>
            <p className="text-muted-foreground mt-4 text-lg">Confirm to transition your GrowBank account to an adult account.</p>
            <Button size="lg" className="mt-8 bg-green-600 hover:bg-green-700" onClick={handleFinish}>
              I'm Ready! Graduate My Account
            </Button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
            <PartyPopper className="mx-auto h-24 w-24 text-primary" />
            <h1 className="text-4xl font-bold mt-6">Congratulations, {userName}!</h1>
            <p className="text-muted-foreground mt-4 text-lg">You've officially graduated. Welcome to your new GrowBank account.</p>
            <Button size="lg" className="mt-8" asChild onClick={onComplete}>
               <Link to="/youth-dashboard">
                Go to My New Dashboard <ArrowRight className="ml-2 h-5 w-5" />
               </Link>
            </Button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm p-4 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {(step === 0 || step === 3) && confettiPieces.map(p => (
         <ConfettiPiece key={p.id} x={p.x} delay={p.delay} duration={p.duration} rotation={p.rotation} />
      ))}
      
      <div className="w-full max-w-md z-10">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>
      </div>

      <Progress value={progress} className="absolute bottom-10 w-full max-w-md z-10" />
    </motion.div>
  );
};

export default GraduationCelebrationAnimator;