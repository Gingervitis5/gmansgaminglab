import { cn } from '@/lib/utils';
import React from 'react';
import Link from "next/link";

const NavText= ({className,spanDesign}:{className?:string,spanDesign?:string}) => {
  return (
    <Link href={"/"}>
        <h2 className={cn("border-spacing-2 mb-2 text-2xl text-shop_red font-black uppercase", className)}>
        Navigation Menu
        </h2>
    </Link>
  );
};

export default NavText;