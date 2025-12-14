import { Title } from './ui/text';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HomeBanner = () => {
  return (
      <div className="bg-[url('/images/playmat_images/Containment_Breach.jpg')] bg-cover bg-position-[center_6.5%] mt-4 mb-4 py-16 md:py10 rounded-lg lg:px-17 flex items-center justify-between">
        <div>
            <Title className="text-4xl">Welcome to the Lab!</Title>
        </div>
        
      </div>
  );
};

export default HomeBanner