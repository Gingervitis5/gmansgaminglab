import React from 'react'
import Link from 'next/link';
import { Heart } from 'lucide-react';

const FavoriteButton = () => {
  return (
    <Link href={"/cart"} className="group relative">
        <Heart className="w-7 h-7 text-shop_light_blue hover:text-shop_white hoverEffect"/>
        <span className="absolute -top-1 -right-1 bg-shop_red text-white h-4 w-4 
        rounded-full text-xs font-light font-poppins flex items-center justify-center">
            0
        </span>
    </Link>
  );
};

export default FavoriteButton;