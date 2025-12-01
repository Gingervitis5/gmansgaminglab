import { AlignCenter, AlignLeft } from 'lucide-react';
import React from 'react'

const MobileMenu = () => {
  return (
    <>
        <button>
            <AlignLeft className="hover:text-shop_clay hoverEffect md:hidden hover:cursor-pointer md:gap-0"></AlignLeft>
        </button>
    </>
  );
};

export default MobileMenu;