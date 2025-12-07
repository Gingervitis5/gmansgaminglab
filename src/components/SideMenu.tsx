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
    <div className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/80 text-shop_white/80 shadow-xl ${isOpen? "translate-x-0" : "-translate-x-full"} hoverEffect`}>
        <div className="min-w-72 max-w-96 bg-shop_dark h-screen p-5 border-r-4 border-r-shop_light_blue flex-col gap-6">
            <div className="flex items-center justify-between gap-1">
                <NavText 
                    className="text-shop_light_blue hover:text-shop_white hoverEffect"
                    spanDesign="hover:text-white"
                />
                <button 
                    onClick={onClose}
                    className="text-shop_light_blue hover:text-shop_white hoverEffect">
                    <X />
                </button>
            </div> 
            <div className="flex flex-col space-y-3 space-y-reverse font-semibold">
                {headerData?.map((item)=>(
                    <Link key={item?.title} href={item?.href} className={`text-shop_light_blue text-med tracking-wide mt-2 hover:text-shop_white hoverEffect relative group ${pathname === item?.href && "text-shop_red"}`}
                    >
                        {item?.title}
                        <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-shop_red text-shop_light_blue group-hover:w-1/2 hoverEffect group-hover:left-0 ${pathname === item?.href && "w-1/2"}`}/>
                        <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-shop_red text-shop_light_blue group-hover:w-1/2 hoverEffect group-hover:right-0 ${pathname === item?.href && "w-1/2"}`}/>
                    </Link>
                    
                ))}
            </div>
        </ div> 
    </div>
  );
};

export default SideMenu;