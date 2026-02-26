"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { useStore } from '../../../../store';
import { useSearchParams } from 'next/navigation';
import { motion } from "motion/react"
import { Check, Home, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

const SuccessPage = () => {
  const {user} = useUser();
  const {resetCart} = useStore();
  const searchParams = useSearchParams();
  const session_id = searchParams?.get("session_id");
  const orderNumber = searchParams?.get("orderNumber");
  useEffect(() => {
    if(session_id){
      resetCart();
    }
  }, [session_id, resetCart]);
  return (
    <div className="py-5 bg-shop_darker flex items-center justify-center mx-4">
      <motion.div 
        className="border-shop_light_blue border-2 rounded-2xl shadow-2xl p-6 max-w-xl w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, type:"spring", stiffness: 200 }}
        >
          <Check className="inline-block mr-2 text-green-500" size={75} />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, type:"spring", stiffness: 200 }}
          className="text-4xl font-extralight text-center text-shop_light_blue"
        >
          Thank you for your purchase!
        </motion.h1>
        <div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, type:"spring", stiffness: 200 }}
            className="text-2xl font-extralight text-center text-shop_light_blue"
          >
            Your order has been processed successfully. Check your email for more details and tracking information.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, type:"spring", stiffness: 200 }}
            className="text-2xl font-extralight text-center text-shop_light_blue"
          >
            Order Number: <span className="font-medium text-shop_white">{orderNumber}</span>
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
          <Link
            href="/"
            className="text-xl tracking-wider flex items-center justify-center px-4 py-3 font-extralight bg-shop_darkest text-shop_light_blue border-2 border-shop_red rounded-lg hover:text-shop_white hover:border-shop_white transition-all duration-300 shadow-md"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>
          <Link
            href="/orders"
            className="text-xl tracking-wider flex items-center justify-center px-4 py-3 font-extralight bg-shop_darkest text-shop_light_blue border-2 border-shop_red rounded-lg hover:text-shop_white hover:border-shop_white transition-all duration-300 shadow-md"
          >
            <Package className="w-5 h-5 mr-2" />
            Orders
          </Link>
          <Link
            href="/"
            className="text-xl tracking-wider flex items-center justify-center px-4 py-3 font-extralight bg-shop_darkest text-shop_light_blue border-2 border-shop_red rounded-lg hover:text-shop_white hover:border-shop_white transition-all duration-300 shadow-md"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shop
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default SuccessPage