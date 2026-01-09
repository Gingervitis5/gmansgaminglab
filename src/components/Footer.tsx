import React from 'react';
import FooterTop from './FooterTop';
import SocialMedia from './SocialMedia';
import Image from 'next/image';
import Link from 'next/link';
import { Text } from 'lucide-react';
import { SubText, SubTitle } from './ui/text';
import { categoriesData, quickLinksData, themesData } from '@/constants/data';
import { Input } from './ui/input';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="bg-shop_darkest border-t-2 border-t-shop_light_blue font-jersey">
        <div>
          <FooterTop />
          <div className="py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 tracking-wide">
            <div>
              <div className="inline-flex ml-7">
                <Image 
                src="/images/Potion.png" 
                alt="Pixel Tentacle"
                width={100}
                height={100}
                />
                <SubText className="text-center text-2xl">Explore the fantastical and visually appealing artworks we have brewed within the Lab.</SubText>
              </div>
              <div className="ml-14">
                <SocialMedia 
                  className="text-shop_light_blue"
                  iconClassName="text-shop_light_blue/75"
                />
              </div>
            </div>
            <div className="ml-8">
              <SubTitle>Quick Links:</SubTitle>
              <ul className="text-shop_light_blue font-jersey group-hover:text-shop_white">
                  {quickLinksData?.map((item)=>(
                    <li key={item?.title}>
                      <Link 
                      href={item?.href} 
                      className="hover:text-shop_white font-light hoverEffect">
                        {item?.title}
                      </Link>
                    </li>
                  ))}
              </ul>
              </div>
              <div className="space-y-4">
                <SubTitle>Newsletter</SubTitle>
                <SubText>
                  Subscribe to our newsletter to receive updates and exclusive
                  offers
                </SubText>
                <form className="space-y-3 text-shop_light_blue">
                  <Input placeholder="Enter your email" type="email" required className="text-shop_light_blue border-2 border-shop_light_blue"/>
                  <Button 
                    className="w-full text-shop_light_blue border-2 border-shop_red hover:border-shop_white hover:text-shop_white"
                    >
                      Subscribe
                    </Button>
                </form>
              </div>
            </div>
          <div>
            <p className="py-6 border-t-2 border-shop_light_blue text-center text-sm font-poppins font-light text-shop_light_blue">
              © {new Date().getFullYear()}{" "}
              GMan's Gaming Lab. All rights reserved.
            </p>
            </div>
        </div>
    </footer>
  );
};

export default Footer