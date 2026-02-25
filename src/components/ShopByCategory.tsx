import Container from './Container';
import React from 'react'
import HomeBanner from './HomeBanner';
import ProductGrid from './ProductGrid';
import Image from 'next/image';
import { Title } from './ui/text';
import { Category } from '../../sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

const ShopByCategory = ({categories}:{categories:Category[]}) => {
  return (
    <div className="bg-shop_darkest my-10 md:my-20 p-5 lg:p-7 rounded-md">
        <div className="border-b-2 border-shop_light_blue flex items-center gap-5 justify-between mb-10">
            <Title>Shop by Categories:</Title>
            <Link
                href={"/shop"}
                className="text-sm font-light tracking-wider hover:text-shop_white hoverEffect"
            >
                <Title>View all</Title>
            </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories?.map((category) => 
                <div key={category._id} className="bg-shop_dark p-2 flex items-center gap-3 group">
                    {category?.image && (
                    <div className="mt-2 overflow-hidden border-2 border-shop_light_blue
                    hover:border-shop_white hoverEffect w-20 h-20 p-1">
                        <Link 
                            href={{pathname: "/shop", query: {category: category?.slug?.current}}}>
                            <Image 
                                src={urlFor(category?.image).url()}
                                alt="categoryImage"
                                width={500}
                                height={500}
                                className="w-full h-full object-contain group-hover:scale-110 hoverEffect bg-shop_darker"
                            />
                        </Link>
                    </div>
                    )}
                    <div className="space-y-1 relative group">
                        <Title>
                            {category?.title}
                            <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-shop_red text-shop_light_blue group-hover:w-1/2 hoverEffect group-hover:left-0`}/>
                            <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-shop_red text-shop_light_blue group-hover:w-1/2 hoverEffect group-hover:right-0`}/>    
                        </Title>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default ShopByCategory