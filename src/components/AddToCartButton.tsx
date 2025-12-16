"use client";
import { Product } from "../../sanity.types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
//import useStore from "@/store";
//import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";

interface Props {
    product?: Product | null | undefined;
    className?: string;
}

const AddToCartButton = ({product, className}: Props) => {

 //const { addItem } = useStore();
 const isAvailable = product?.status !== "unavailable";

 /*const handleAddToCart = () => {
    if (isAvailable) {
      addItem(product);
      toast.success(
        `${product?.name?.substring(0, 12)}... added successfully!`
      );
    } else {
      toast.error("Can't add an unavailable item");
    }
  };*/

  return (
    <div  className={cn( "", className)}>
        <Button
        //onClick={handleAddToCart}
            disabled={!isAvailable}
            className={cn("bg-shop_darkest text-lg text-shop_light_blue shadow-none border border-shop_red font-light tracking-wide hover:text-shop_white hover:border-shop_white hoverEffect", className)}
        >
            <ShoppingBag /> Add to Cart
        </Button>
    </div>
  );
};

export default AddToCartButton