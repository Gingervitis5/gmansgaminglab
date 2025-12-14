"use client";
import { Product, Theme } from "../../sanity.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

interface Props{
    themes: Theme[];
    slug: string;
}

const ThemeProducts = ({themes, slug}: Props) => {
    const [currentSlug, setCurrentSlug] = useState(slug);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleThemeChange = (newSlug: string) => {
        if(newSlug === currentSlug) return; // Prevent unnecessary updates
        setCurrentSlug(newSlug);
        router.push(`/theme/${newSlug}`, {scroll: false}); // Update URL
    };

    const fetchProducts = async(themeSlug: string)=>{
        setLoading(true);
        try{
            const query = `*[_type == "product" && references(*[_type == "theme" && slug.current == $themeSlug]._id)] | order(name asc){
                            ..., "themes": themes[]->title, "categories": categories[]->title
                            }`;
            const data = await client.fetch(query, {themeSlug});
            setProducts(data);
        }catch(error){
            console.log("Error fetching products: ", error);
            setProducts([]);
        }finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchProducts(currentSlug);
    },[router])

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
        <div className="flex flex-col md:min-w-40 ">
            {themes?.map((theme)=>( 
                <Button
                    onClick={()=>handleThemeChange(theme?.slug?.current as string)}
                    key={theme?._id}
                    className={`bg-shop_dark p-0 m-1 border border-shop_light_blue
                        text-shop_light_blue text-2xl shadow-none hover:text-shop_white hover:border-shop_white tracking-wider
                        hoverEffect transition-colors capitalize ${theme?.slug?.current === currentSlug && "bg-shop_darkest text-shop_white border-shop_white"}`}
                >
                    <p>
                        {theme?.title}
                    </p>
                </Button>
            ))}
        </div>
        <div className="flex-1">
            {loading ? (
            <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-shop_darker rounded-lg w-full">
                <div className="flex items-center space-x-2 text-shop_light_blue">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-2xl">Loading Products...</span>
                </div>
            </div>
            ) : products?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {products?.map((product: Product) => (
                <AnimatePresence key={product._id}>
                    <motion.div>
                    <ProductCard product={product} />
                    </motion.div>
                </AnimatePresence>
                ))}
            </div>
            ) : (
            <NoProductAvailable
                selectedTab={`${currentSlug} themes`}
                className="mt-0 w-full capitalize"
            />
            )}
        </div>
    </div>
  )
}

export default ThemeProducts