import React from 'react'
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { Product } from '../../sanity.types';



const FavoriteButton = ({
  showProduct = false,
  product,
  className,
}:{
  showProduct?: boolean;
  product?: Product | null | undefined;
  className: string;
}) => {
  return (
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className={cn(`text-shop_light_blue hover:text-shop_white group hoverEffect`,className)}/>
          <span className="absolute -top-1 -right-1 bg-shop_red text-white h-4 w-4 
          rounded-full text-xs font-light font-poppins flex items-center justify-center">
              0
          </span>
        </Link> 
        ) : (
        <button className="group relative hover:border-shop_white  hoverEffect 
        border-2 border-shop_light_blue p-1.5 rounded-sm">
          <Heart className={cn(`text-shop_light_blue group hoverEffect`, className)}/>
        </button> 
        )
    }
    </>
  );
};

export default FavoriteButton;