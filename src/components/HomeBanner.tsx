import { Title } from './ui/text';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Space } from 'lucide-react';
import { banner_1 } from '../../public/images';

const HomeBanner = () => {
  return (
      <div className="bg-[url('/images/playmat_images/Containment_Breach.jpg')] bg-cover bg-center py-16 md:py-8 rounded-lg px-10 lg:px-24 flex items-center justify-between">
        <div>
            <Title>Welcome to the Lab!</Title>
        </div>
        <div>
            <Link href={"/playmats"} className="tracking-wide bg-shop_sand font-bold text-shop_red px-5 py-2 rounded-md text-sm hover:text-shop_white">Shop Playmats</Link>
            <Link href={"/playmats"} className="tracking-wide bg-shop_sand font-bold text-shop_red px-5 py-2 rounded-md text-sm hover:text-shop_white">Shop Maps</Link>
        </div>
      </div>
  );
};

export default HomeBanner