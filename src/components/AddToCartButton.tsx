"use client"
import React from 'react';
import { Product } from '../../sanity.types';
import { ShoppingBag } from 'lucide-react';
import { Button } from "./ui/button";
import { cn } from '@/lib/utils';

interface Props {
    product: Product;
    className?: string;
}

const AddToCartButton = ({product, className}: Props) => {
  return (
    <div>
        <Button
            className={cn("w-full bg-shop_darkest text-shop_light_blue shadow-none border border-shop_red font-extralight tracking-wide hover:text-shop_white hover:border-shop_white hoverEffect", className)}
        >
            <ShoppingBag /> Add to Cart
        </Button>
    </div>
  );
};

export default AddToCartButton