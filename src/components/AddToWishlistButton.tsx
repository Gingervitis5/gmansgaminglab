"use client"
import React, { useEffect, useState } from 'react';
import { Product } from '../../sanity.types';
import { Heart } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useStore } from '../../store';
import toast from 'react-hot-toast';

const AddToWishlistButton = ({
    product,
    className,
    } : {
       product: Product;
       className?: string; 
    } ) => {
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
        <div className={cn("absolute top-2 right-2 z-10 hover:cursor-pointer", className)}>
            <div 
                onClick={handleFavorite}
                className={`p-1.5 rounded-full text-shop_light_blue border-shop_red border-2 bg-shop_darkest hover:border-shop_white hover:text-shop_white hoverEffect`}> 
                {existingProduct ? (
                    <Heart
                        fill="#02E7FC"
                        className="text-shop_light_blue group-hover:text-shop_white hoverEffect mt-.5 w-5 h-5"
                    />
                    ) : (
                    <Heart className="text-shop_light_blue group-hover:text-shop_white hoverEffect mt-.5 w-5 h-5" />
                    )
                }
            </div>
        </div>
    );
};

export default AddToWishlistButton