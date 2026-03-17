import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import { Title, SubText } from "@/components/ui/text";
import { getProductBySlug } from "@/sanity/queries";
import { CornerDownLeft, StarIcon, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

const SingleProductPage = async({
    params
    }:{
    params:Promise<{slug:string}>;
    }) => {
    const { slug } = await params;
    const product = (await getProductBySlug(slug)) as any;
    console.log(product);
    if(!product){
        return notFound();
    }
    return (
        <Container className="flex flex-col md:flex-row gap-10 py-5">
            {product?.images && 
            <ImageView 
                images={product?.images}
                isAvailable={product?.status}
            />}
            <div className="w-full md:w-1/2 flex flex-col gap-5">
                <div className="text-shop_light_blue space-y-2">
                    <Title className="text-4xl">
                        {product?.name}
                    </Title>
                    <SubText className="text-2xl">
                        {product?.description}
                    </SubText>
                    <div className="border-t border-b border-shop_light_blue py-5 grid grid-cols-6 sm:grid-cols-1">
                        <PriceView 
                            price={product?.price}
                            discount = {product?.discount}
                            className="text-3xl"
                            />
                    </div>
                </div>
                <div className="flex gap-3 relative group hover:border-shop_white hoverEffect">
                    <FavoriteButton showProduct={true} product={product} className="w-5 h-5 group hoverEffect" />
                    {(product?.status === "unavailable" || product?.status === "coming_soon") && 
                            (
                                <div className="text-center w-full text-shop_red text-lg font-extralight pt-0.5 pb-0.5 mt-1 mb-1 rounded-full border-2 border-shop_red bg-shop_darkest">
                                    {product.status === "unavailable" ? "Unavailable" : "Coming Soon"}
                                </div>
                            )
                        }
                    {(product?.status !== "unavailable" && product?.status !== "coming_soon") && 
                        <AddToCartButton 
                            product={product}
                            className="w-full rounded-full mt-1 mb-1"
                        />
                    }
                </div>
                <ProductCharacteristics product={product}/>
             <div className="flex flex-wrap items-center justify-between border-b border-b-shop_light_blue py-5-mt-5">
            </div>
        </div>
        </Container>
    );
    };

    export default SingleProductPage;