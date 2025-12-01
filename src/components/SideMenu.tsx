import { X } from 'lucide-react';
import React, { FC } from 'react';
import Logo from './Logo';
import NavText from './NavText'
import Link from 'next/link';
import { headerData } from '@/constants/data';
import { usePathname } from 'next/navigation';
interface SidebarProps{
    isOpen: boolean;
    onClose: () => void;
}

const SideMenu:FC<SidebarProps> = ({isOpen, onClose}) => {
    const pathname = usePathname();
  return (
    <div className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/80 text-shop_snow/80 shadow-xl ${isOpen? "translate-x-0" : "-translate-x-full"} hoverEffect`}>
        <div className="min-w-72 max-w-96 bg-shop_white h-screen p-5 border-r-4 border-r-shop_red flex-col gap-6">
            <div className="flex items-center justify-between gap-1">
                <NavText 
                    className="text-shop_red hover:text-shop_clay hoverEffect"
                    spanDesign="hover:text-white"
                />
                <button 
                    onClick={onClose}
                    className="text-shop_red hover:text-shop_clay hoverEffect">
                    <X />
                </button>
            </div> 
            <div className="flex flex-col space-y-3 space-y-reverse font-semibold tracking-wide">
                {headerData?.map((item)=>(
                    <Link key={item?.title} href={item?.href} className={`text-shop_red text-med tracking-wide hover:text-shop_clay hoverEffect relative group ${pathname === item?.href && "text-shop_clay"}`}
                    >
                        {item?.title}
                    </Link>
                ))}
            </div>
        </ div> 
    </div>
  );
};

export default SideMenu;