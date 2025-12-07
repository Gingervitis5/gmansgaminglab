import React from 'react';
import FooterTop from './FooterTop';
import SocialMedia from './SocialMedia';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-shop_darkest border-t border-t-shop_light_blue">
        <div>
          <FooterTop />
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="inline-flex ml-7">
                <Image 
                src="/images/Potion.png" 
                alt="Pixel Tentacle"
                width={100}
                height={100}
                />
                <p className="text-shop_light_blue font-pixelify font-light mt-3">Explore the fantastical and visually appealing artworks we have brewed within the Lab.</p>
              </div>
              <div className="ml-16">
                <SocialMedia 
                  className="text-shop_light_blue"
                  iconClassName="text-shop_light_blue/75"
                />
              </div>
            </div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
    </footer>
  );
};

export default Footer