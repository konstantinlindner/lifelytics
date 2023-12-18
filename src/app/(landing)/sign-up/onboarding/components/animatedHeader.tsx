'use client';

import { motion } from 'framer-motion';

interface AnimatedHeaderProps {
  firstName: string;
}

export default function AnimatedHeader({ firstName }: AnimatedHeaderProps) {
  return (
    <div className="container flex flex-col space-y-10 items-center">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="font-heading leading-10 text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to Lifelytics, {firstName}!
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p>Just a few more steps to get started</p>
      </motion.div>
    </div>
  );
}
