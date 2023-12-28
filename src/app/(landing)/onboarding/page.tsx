'use client';

import { useState } from 'react';

import { useUser } from '@/contexts/UserContext';

import { motion } from 'framer-motion';

import ProfilePictureView from './components/profilePictureView';
import CurrencyPickerView from './components/currencyPickerView';
import BirthDateView from './components/birthDateView';

import { Progress } from '@/components/ui/progress';

export default function Onboarding() {
  const firstName = useUser().user?.firstName;

  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  const progress = (() => {
    switch (currentViewIndex) {
      case 0:
        return 20;
      case 1:
        return 60;
      case 2:
        return 85;
      default:
        return 100;
    }
  })();

  const header = (() => {
    switch (currentViewIndex) {
      case 0:
        return `Welcome to Lifelytics, ${firstName}!`;
      case 1:
        return 'Nice!';
      case 2:
        return 'Last step';
      default:
        return '';
    }
  })();

  const subHeader = (() => {
    switch (currentViewIndex) {
      case 0:
        return 'Choose your most used currencies';
      case 1:
        return 'Now enter your date of birth';
      case 2:
        return 'Upload a profile picture';
      default:
        return '';
    }
  })();

  const text = (() => {
    switch (currentViewIndex) {
      case 0:
        return '';
      case 1:
        return '';
      case 2:
        return `Users who upload a profile picture are 80% more likely to stick to
        their goals`;
      default:
        return '';
    }
  })();

  const views = [
    <CurrencyPickerView
      key="currencyPickerView"
      currentViewIndex={currentViewIndex}
      setCurrentViewIndex={setCurrentViewIndex}
    />,
    <BirthDateView
      key="birthDateView"
      currentViewIndex={currentViewIndex}
      setCurrentViewIndex={setCurrentViewIndex}
    />,
    <ProfilePictureView
      key="profilePictureView"
      currentViewIndex={currentViewIndex}
      setCurrentViewIndex={setCurrentViewIndex}
    />,
  ];

  return (
    <div className="container flex h-screen w-screen flex-col items-center max-w-[64rem] pb-8 space-y-10">
      <div className="w-full p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <Progress value={progress} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="max-w-2xl font-heading leading-10 text-center text-4xl sm:text-5xl md:text-6xl lg:text-6xl">
          {header}
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <div className="flex flex-col space-y-10 flex-grow">
          <div className="flex flex-col space-y-2">
            <h1 className="font-small text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              {subHeader}
            </h1>
            <p>{text}</p>
          </div>

          {views[currentViewIndex]}
        </div>
      </motion.div>
    </div>
  );
}
