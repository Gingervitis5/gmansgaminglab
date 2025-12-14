"use client";
import { Category, Product } from "../../sanity.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

interface Props{
    categories: Category[];
    slug: string;
}

const CategoryProducts = ({categories, slug}: Props) => {
    const [currentSlug, setCurrentSlug] = useState(slug);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCategoryChange = (newSlug: string) => {
        if(newSlug === currentSlug) return; // Prevent unnecessary updates
        setCurrentSlug(newSlug);
        router.push(`/category/${newSlug}`, {scroll: false}); // Update URL
    };

    const fetchProducts = async(categorySlug: string)=>{
        setLoading(true);
        try{
            const query = `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
                            ...,"categories": categories[]->title
                            }`;
            const data = await client.fetch(query, {categorySlug});
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
            {categories?.map((category)=>( 
                <Button
                    onClick={()=>handleCategoryChange(category?.slug?.current as string)}
                    key={category?._id}
                    className={`bg-shop_dark p-0 m-1 border border-shop_light_blue
                        text-shop_light_blue text-2xl shadow-none hover:text-shop_white hover:border-shop_white tracking-wider
                        hoverEffect transition-colors capitalize ${category?.slug?.current === currentSlug && "bg-shop_darkest text-shop_white border-shop_white"}`}
                >
                    <p>
                        {category?.title}
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
                selectedTab={currentSlug}
                className="mt-0 w-full"
            />
            )}
        </div>
    </div>
  )
}

export default CategoryProducts