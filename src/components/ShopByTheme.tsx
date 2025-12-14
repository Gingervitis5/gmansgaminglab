import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import { Title } from './ui/text';
import { getAllThemes } from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';

const ShopByTheme = async() => {
  const themes = await getAllThemes();
  return (
    <div className="mb-10 lg:pb-20 bg-shop_darkest p-5 lg:p-7 roundeed-md">
        <div className="border-b-2 border-shop_light_blue flex items-center gap-5 justify-between mb-10">
            <Title>Shop by Themes:</Title>
            <Link
                href={"/shop"}
                className="text-sm font-light tracking-wider hover:text-shop_white hoverEffect"
            >
                <Title>View all</Title>
            </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2.5  hoverEffect">
            {themes?.map((themes)=>(
                <Link 
                    href={`/theme/${themes?.slug?.current}`}
                    key={themes?._id}
                    className="bg-shop_dark flex items-center justify-center w-34 h-34
                                overflow-hidden"
                >
                    {themes?.image && 
                    <Image 
                        src={urlFor(themes?.image).url()}
                        alt="themeImage"
                        width={250}
                        height={250}
                        className="w-20 h-20 object-contain border-2 border-shop_light_blue hover:border-shop_white hoverEffect bg-shop_darkest"
                    />}
                </Link>
            ))}
        </div>
    </div>
  );
};

export default ShopByTheme;