import React from 'react';
import { Product } from '../../sanity.types';
import { Heart } from 'lucide-react';
import { cn } from "@/lib/utils";

const AddToWishlistButton = ({
    product,
    className,
    } : {
       product: Product;
       className?: string; 
    } ) => {
        return (
        <div className={cn("absolute top-2 right-2 z-10", className)}>
            <div className="p-2 rounded-full text-shop_light_blue bg-shop_darkest border-2 border-shop_red hover:border-shop_white hover:text-shop_white hoverEffect"> 
                <Heart 
                width = {16}
                height = {16}
                />
            </div>
        </div>
    );
};

export default AddToWishlistButton