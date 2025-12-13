import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddToWishlistButton from './AddToWishlistButton';
import { Product } from '../../sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { Flame, StarIcon } from 'lucide-react';
import { Title } from './ui/text';
import PriceView from './PriceView';
import AddToCartButton from './AddToCartButton';

const ProductCard = ({product}: {product: Product}) => {
  return (
    <div className="text-sm border-2 border-shop_light_blue rounded-sm bg-shop_dark group hover:border-shop_white">
        <div className="relative group overflow-hidden bg-shop_light_blue">
            {product?.images && (
                <Image 
                    src={urlFor(product?.images[0]).url()} 
                    alt="ProductImage"
                    loading="eager"
                    width={700}
                    height={700}
                    className={`w-full h-38 object-contain overflow-hidden transition-transform
                    bg-shop_darkest group-hover:scale-105 hoverEffect`}
                />
            )}
            <AddToWishlistButton product={product}/>
            {product?.status === "sale" && 
                (
                    <p className="absolute top-2 left-2 z-10 pb-1 pt-1 pl-2 pr-2 
                    text-shop_light_blue text-sm font-extralight rounded-full border-2 border-shop_red 
                    bg-shop_darkest hover:border-shop_white hover:text-shop_white hoverEffect">
                        Sale
                    </p>
                )
            }
            {product?.status === "new" && 
                (
                    <p className="absolute top-2 left-2 z-10 pb-1 pt-1 pl-2 pr-2 
                    text-shop_light_blue text-sm font-extralight rounded-full border-2 border-shop_red 
                    bg-shop_darkest hover:border-shop_white hover:text-shop_white hoverEffect">
                        New
                    </p>
                )
            }
            {product?.status === "hot" &&
                (
                <Link 
                    href={"/deal"}
                    className="absolute top-2 left-2 z-10 pb-1 pt-1 pl-2 pr-2 
                    text-shop_orange font-extralight rounded-full border-2 border-shop_red 
                    bg-shop_darkest hover:border-shop_white hover:text-shop_white hoverEffect"
                >
                <Flame 
                    size = {18} 
                    fill = "#fb6c08"
                    className="text-shop_orange/50 group-hover:text-shop_orange hoverEffect"
                />
                </Link>
                )
            }
        </div>
        <div className="p-2 gap-2 flex flex-col text-shop_light_blue/80 font-extralight">
            {product?.categories && 
                (
                    <p className=" uppercase line-clamp-1">
                        {product?.categories?.map((cat)=>cat).join(", ")}
                    </p>
                )
            }
            <Title className="text-sm line-clamp-2 text-shop_light_blue font-normal group-hover:text-shop_white hoverEffect">
                {product?.name}
            </Title>
            <div className="flex items-center gap-2"> 
                <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, index)=>(
                        <StarIcon 
                        size={20}
                        key={index} 
                        className={index < 4 ? "text-shop_light_blue" : "text-shop_gray"}
                        fill={index < 4 ? "#01555D" : "#100F0F"}
                        />
                    ))}
                </div>
                <p className="text-shop_light_blue tracking-wide">
                    5 Reviews
                </p>
                
            </div>
        </div>
        <PriceView 
            price={product?.price}
            discount={product.discount}
            className="text-sm pl-2"
        />
        <div className="pl-2  flex items-center">
            {product?.status === "unavailable" && 
                (
                    <div className="text-shop_red text-sm font-extralight p-1.5 pl-3 pr-3 pr-2 rounded-full border-2 border-shop_red bg-shop_darkest">
                        Unavailable
                    </div>
                )
            }
            {product?.status !== "unavailable" && 
                <AddToCartButton 
                    product={product}
                    className="w-36 rounded-full mt-1 mb-1"
                />
            }
        </div>
    </div>
  );
};

export default ProductCard