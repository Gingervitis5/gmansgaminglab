"use client";

import { motion } from "motion/react";

const NoSalesAvailable = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-shop_darker rounded-lg w-full mt-10 tracking-wider"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-normal text-shop_light_blue">
          We&apos;re sorry, but there are currently no sales happening at the moment.
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-shop_light_blue text-lg font-light"
      >
        Please check back later for new and exciting deals.
      </motion.p>
    </div>
  );
};

export default NoSalesAvailable;