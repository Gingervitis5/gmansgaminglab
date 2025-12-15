"use client"
import { headerData } from '@/constants/data';
import { usePathname } from 'next/navigation';
import React from 'react';
import Link from "next/link";

const HeaderMenu = () => {
  const pathname = usePathname();
  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-7 capitalize font-jersey font-extralight text-lightColor" >
        {headerData?.map((item)=>(
          <Link key = {item?.title} href={item?.href} className={`text-shop_light_blue text-4xl tracking-wider hover:text-shop_white hoverEffect relative group ${pathname === item?.href && "text-shop_red"}`}>
            {item?.title}
            <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-shop_red text-shop_light_blue group-hover:w-1/2 hoverEffect group-hover:left-0 ${pathname === item?.href && "w-1/2"}`}/>
            <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-shop_red text-shop_light_blue group-hover:w-1/2 hoverEffect group-hover:right-0 ${pathname === item?.href && "w-1/2"}`}/>
          </Link>
        ))}
    </div>
  )
}

export default HeaderMenu