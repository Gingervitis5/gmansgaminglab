import { productType } from '@/constants/data';
import Link from 'next/link';
import React from 'react';

interface Props {
    selectedTab: string;
    onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({selectedTab, onTabSelect}:Props) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-5 tracking-widest text-2xl">
        <div className="flex items-center gap-1.5 text-sm font-light">
            {productType?.map((item)=>(
                <button 
                onClick={()=>onTabSelect(item?.title)}
                key={item?.title} 
                className={`border-2 border-shop_red bg-shop_dark text-lg text-shop_light_blue px-3 py-1.5
                md:px-6 md:py-2 rounded-full hover:text-shop_white hover:border-shop_white hoverEffect
                ${selectedTab === item?.title ? "border-shop_white text-shop_white" : "border-shop_red"}`}>
                    {item?.title}
                </button>
            ))}
        </div>
        <Link 
        href={"/shop"}
        className="border-2 border-shop_red bg-shop_dark text-lg text-shop_light_blue px-3 py-1.5
                md:px-6 md:py-2 rounded-full hover:text-shop_white hover:border-shop_white hoverEffect">
            See all
        </Link>
    </div>
  );
};

export default HomeTabBar