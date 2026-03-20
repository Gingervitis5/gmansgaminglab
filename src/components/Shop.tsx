"use client"
import React, { useEffect, useState } from 'react';
import { Category, Product, THEMES_QUERY_RESULT, VARIANTS_QUERY_RESULT } from '../../sanity.types';
import Container from './Container';
import { Title } from './ui/text';
import CategoryList from './shop/CategoryList';
import ThemeList from './shop/ThemeList';
import TypeList from './shop/TypeList';
import { useSearchParams } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { Loader2 } from 'lucide-react';
import NoProductAvailable from './NoProductAvailable';
import ProductCard from './ProductCard';

interface Props {
    categories: Category[];
        themes: THEMES_QUERY_RESULT;
        variants: VARIANTS_QUERY_RESULT;
}

const Shop = ({categories, themes, variants}: Props) => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams?.get("category");
  const themeParams = searchParams?.get("theme");
    const variantParams = searchParams?.get("variant");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParams || null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(themeParams || null);
    const [selectedVariant, setSelectedVariant] = useState<string | null>(variantParams || null);
  const fetchProducts=async()=>{
    setLoading(true);
    try{
        const query = `
        *[_type == 'product' 
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
        && (!defined($selectedTheme) || references(*[_type == "theme" && slug.current == $selectedTheme]._id))
        && (!defined($selectedVariant) || variant == $selectedVariant)
        ] 
        | order(name asc) {
            ...,"categories": categories[]->title
        }`;
        const data = await client.fetch(query, {selectedCategory, selectedTheme, selectedVariant}, { next: {revalidate: 0}});
        setProducts(data);
    } catch(error){
        console.error("Shop product fetching error", error);
    }finally {
        setLoading(false);
    }
  }
  useEffect(()=> {
    fetchProducts();
    }, [selectedCategory, selectedTheme, selectedVariant])
  return <div className="">
            <Container className="mt-5">
                <div className="sticky top-0 z-10 mb-5">
                    <div className="flex items-center justify-between">
                        <Title className="uppercase tracking-wide">Shop all Products</Title>
                        {(
                            selectedCategory !== null || 
                            selectedTheme !== null ||
                            selectedVariant !== null) && (
                            <button 
                                onClick={() => {
                                    setSelectedCategory(null)
                                    setSelectedTheme(null)
                                    setSelectedVariant(null)
                                }}
                                className="text-shop_light_blue underline text-lg tracking-wider
                                            hover:text-shop_white hoverEffect"
                            >
                                Reset filters
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-5 border-t-2 border-shop_light_blue">
                    <div className="md-sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] scrollbar-hide
                                    md:overflow-y-auto md:min-w-64 pb-5 md:border-r-2 border-r-shop_light_blue">
                        <CategoryList 
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                        <ThemeList 
                            themes={themes}
                            setSelectedTheme={setSelectedTheme}
                            selectedTheme={selectedTheme}
                        />
                        <TypeList
                            variants={variants}
                            selectedVariant={selectedVariant}
                            setSelectedVariant={setSelectedVariant}
                        />
                    </div>
                    <div className="flex-1 pt-5">
                        <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
                            {loading ? (
                            <div className="p-20 flex flex-col gap-2 items-center justify-center">
                                <Loader2 className="w-10 h-10 text-shop_light_blue animate-spin"/>
                                <p className="text-2xl tracking-wider text-shop_light_blue">Loading...</p>
                            </div> 
                            ) : products?.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                                    {products?.map((product)=> (
                                        <ProductCard key={product._id} product={product}/>
                                    ))}
                                </div>
                                ) : (
                                <div>
                                    <NoProductAvailable />
                                </div>
                                )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
};

export default Shop