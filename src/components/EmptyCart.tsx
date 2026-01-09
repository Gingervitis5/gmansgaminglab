"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EmptyCart() {
  return (
    <div className="py-10 md:py-20 bg-shop_darker flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-shop_darkest border-3 border-shop_light_blue rounded-2xl shadow-xl p-8 max-w-md w-full space-y-8"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          className="relative w-48 h-48 mx-auto"
        >
          <Image
            src="/images/Headshot.png" 
            alt="Empty shopping cart"
            layout="fill"
            objectFit="contain"
            className="drop-shadow-lg"
          />
          <motion.div
            animate={{
              x: [0, -10, 10, 0],
              y: [0, -5, 5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
            }}
            className="absolute -top-4 -right-4 bg-blue-500 rounded-full p-2"
          >
            <ShoppingCart size={24} className="text-white" />
          </motion.div>
        </motion.div>

        <div className="text-center space-y-4">
          <h2 className="text-3xl text-shop_light_blue font-extralight">
            Your cart is empty
          </h2>
          <p className="text-shop_light_blue font-extralight text-lg tracking-normal">
            It looks like you haven&apos;t added anything to your cart yet.
            Let&apos;s change that and find some amazing products for you!
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="block font-extralight text-lg text-shop_light_blue bg-shop_darkest border-2 border-shop_red text-center 
            py-2.5 rounded-full tracking-wider hover:border-shop_white hover:text-white hoverEffect"
          >
            Browse Products
          </Link>
        </div>
      </motion.div>
    </div>
  );
}