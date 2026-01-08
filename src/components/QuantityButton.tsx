import React from 'react'
import { useStore } from '../../store';
import { Product } from '../../sanity.types';
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from "react-hot-toast";

interface Props{
    product: Product;
    className?: string;
}

const QuantityButton = ({product, className}: Props) => {
    const {addItem,removeItem,getItemCount} = useStore();
    const itemCount = getItemCount(product?._id)
    const isAvailable = product?.status !== "unavailable";

const handleRemoveProduct = () => {
    removeItem(product?._id);
    if (itemCount > 1) {
      toast.success("Decreased quantity successfully!");
    } else {
      toast.success(`${product?.name?.substring(0, 12)}... removed successfully!`);
    }
  };

  const handleAddToCart = () => {
    if (itemCount < 2) {
      addItem(product);
      toast.success("Increased quantity successfully!");
    } else {
      toast.error("Can't add more 2 items at a time");
    }
  };

  return (
    <div className={cn(`flex items-center gap-1 pb-1 text-base`, className)}>
        <Button 
            onClick={handleRemoveProduct}
            variant="outline" 
            size="icon" 
            disabled={itemCount === 0 || !isAvailable}
            className="w-6 h-6 text-shop_light_blue border border-shop_light_blue bg-shop_darker hover:text-shop_white hover:border-shop_white hover:bg-shop_darkest"
        >
            <Minus />
        </Button>
        <span className="w-6 text-center text-shop_light_blue">{itemCount}</span>
        <Button
            onClick={handleAddToCart}
            variant="outline" 
            size="icon" 
            disabled={itemCount === 0 || !isAvailable}
            className="w-6 h-6 text-shop_light_blue border border-shop_light_blue bg-shop_darker hover:text-shop_white hover:border-shop_white hover:bg-shop_darkest"
        >
            <Plus />
        </Button>
    </div>
  );
};

export default QuantityButton