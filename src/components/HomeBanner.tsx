import { Title } from './ui/text';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HomeBanner = () => {
  return (
      <div className="bg-[url('/images/playmat_images/Containment_Breach.jpg')] bg-cover bg-position-[center_6.5%] mt-4 py-16 md:py10 rounded-lg lg:px-17 flex items-center justify-between">
        <div>
            <Title>Welcome to the Lab!</Title>
        </div>
        <div>
            <Link href={"/playmats"} className="tracking-wide bg-shop_light_blue font-pixelify font-bold text-shop_darkest mr-4 px-4 py-2 rounded-md text-npm,lg hover:text-shop_white">Shop Playmats</Link>
            <Link href={"/maps"} className="tracking-wide bg-shop_light_blue font-pixelify font-bold text-shop_darkest mr-4 px-4 py-2 rounded-md text-lg hover:text-shop_white">Shop Maps</Link>
        </div>
      </div>
  );
};

export default HomeBanner