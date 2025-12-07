import { Title } from './ui/text';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Space } from 'lucide-react';
import { banner_1 } from '../../public/images';

const HomeBanner = () => {
  return (
      <div className="bg-[url('/images/playmat_images/Containment_Breach.jpg')] bg-cover bg-position-[center_6.5%] mt-4 py-16 md:py10 rounded-lg lg:px-17 flex items-center justify-between">
        <div>
            <Title>Welcome to the Lab!</Title>
        </div>
        <div>
            <Link href={"/playmats"} className="tracking-normal bg-shop_sand font-pixelify font-medium text-shop_red mr-4 px-4 py-2 rounded-md border-2 border-shop_red text-lg hover:text-shop_white">Shop Playmats</Link>
            <Link href={"/maps"} className="tracking-normal bg-shop_sand font-pixelify font-medium text-shop_red mr-4 px-4 py-2 rounded-md border-2 border-shop_red text-lg hover:text-shop_white">Shop Maps</Link>
        </div>
      </div>
  );
};

export default HomeBanner