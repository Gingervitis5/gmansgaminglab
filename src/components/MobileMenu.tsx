"use client"
import { AlignCenter, AlignLeft } from 'lucide-react';
import React, { useState } from 'react'
import SideMenu from './SideMenu';

const MobileMenu = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <AlignLeft className="text-shop_sand hover:text-shop_white hoverEffect md:hidden hover:cursor-pointer md:gap-0"></AlignLeft>
        </button>
        <div className="md:hidden">
            <SideMenu 
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </div>
        
    </>
  );
};

export default MobileMenu;