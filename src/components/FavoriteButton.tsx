"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { Product } from '../../sanity.types';
import { useStore } from '../../store';
import toast from 'react-hot-toast';

const FavoriteButton = ({
  showProduct = false,
  product,
  className,
}:{
  showProduct?: boolean;
  product?: Product | null | undefined;
  className: string;
}) => {
  const {favoriteProduct,addToFavorite} = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  useEffect(()=>{
      const availableProduct = favoriteProduct?.find(
          (item)=>item?._id === product?._id
      );
      setExistingProduct(availableProduct || null);
  }, [product, favoriteProduct])
  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      if(product?._id){
          addToFavorite(product).then(()=>{
              toast.success(existingProduct ? 
                  "Removed product from favorites!" : 
                  "Added product to favorites!");
          });
      }
  };
  return (
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="w-7 h-7 text-shop_light_blue hover:text-shop_white hoverEffect" />
          <span className="absolute -top-1 -right-1 bg-shop_red text-white h-4 w-4 
        rounded-full text-xs font-light font-poppins flex items-center justify-center">
            {favoriteProduct?.length ? favoriteProduct?.length : 0}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          className="group relative hover:text-shop_light_green hoverEffect border-2 border-shop_light_blue hover:border-shop_white p-1.5 rounded-sm"
        >
          {existingProduct ? (
            <Heart
              fill="#02E7FC"
              className="text-shop_light_blue group-hover:text-shop_white hoverEffect mt-.5 w-5 h-5"
            />
          ) : (
            <Heart className="text-shop_light_blue group-hover:text-shop_white hoverEffect mt-.5 w-5 h-5" />
          )}
        </button>
      )}
    </>
  );
};

export default FavoriteButton;