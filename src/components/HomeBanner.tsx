import { Title } from './ui/text';
import React from 'react';

const HomeBanner = () => {
  return (
      <div className="bg-[url('/images/playmats/Containment_Breach_Playmat_Watermarked.png')] bg-cover bg-position-[center_6.5%] mt-4 mb-4 py-16 md:py10 rounded-lg lg:px-17 max-h-35 flex items-center justify-between">
        <div>
            <Title className="text-4xl">Welcome to the Lab!</Title>
        </div>
        
      </div>
  );
};

export default HomeBanner