"use client";
import { Product } from "../../sanity.types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { useStore } from "../../store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButton from "./QuantityButton";
import PriceView from "./PriceView";

interface Props {
    product?: Product;
    className?: string;
}

const AddToCartButton = ({product, className}: Props) => {

 const { addItem,getItemCount } = useStore();
 const itemCount=getItemCount(product?._id);
 const isAvailable = product?.status !== "unavailable";

 const handleAddToCart = () => {
    if (isAvailable && itemCount < 99) {
      addItem(product);
      toast.success(
        `${product?.name?.substring(0, 12)}... added successfully!`
      );
    } else {
      if (itemCount >= 99){
        toast.error("Can't have more than 99 items in your cart.");
      } else {
        toast.error("Can't add an unavailable item.");
      }
    }
  };

  return (
    <div className={cn( "", className)}>
        { itemCount ? (
          <div className="text-shop_light_blue tracking-wider w-full">
            <div className="flex items-center justify-between">
              <span>Quantity</span>
              <QuantityButton product={product} />
            </div>
            <div className="flex items-center justify-between">
              <span>Subtotal:</span>
              <PriceView 
                price={product?.price ? product?.price * itemCount : 0}
                discount={product?.discount ? product?.discount : undefined}
              />
            </div>
          </div>
        ) : (
          <Button
              onClick={handleAddToCart}
              disabled={!isAvailable}
              className={cn("bg-shop_darkest text-lg text-shop_light_blue shadow-none border-2 border-shop_red font-light tracking-wide hover:text-shop_white hover:border-shop_white hoverEffect", className)}
            >
                <ShoppingBag /> {isAvailable ? "Add to Cart" : "Can't Add to Cart"}
          </Button>
        )}
    </div>
  );
};

export default AddToCartButton