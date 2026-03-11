'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

// Remove the Image component from the data array
const data = [
    {
        title: "Email Us",
        subtitle: "gmansgaminglab@gmail.com",
        iconSrc: "/images/Email_Icon.png", // Store only the path
        altText: "Pixel_Email"
    },
    {
        title: "Buy me a coffee!",
        subtitle: "https://buymeacoffee.com/gmansgaminglab",
        iconSrc: "/images/Coffee.png", // Store only the path
        altText: "Pixel_Coffee"
    },
    {
        title: "Follow us on Instagram",
        subtitle: "https://instagram.com/gmansgaminglab",
        iconSrc: "/images/Instagram.png", // Store only the path
        altText: "Pixel_Instagram"
    }
];

const FooterTop = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b-2 border-b-shop_light_blue">
        {data?.map((item, index) => (
            <div key={index} className="flex items-center gap-3 group p-3 transition-colors">
            <Image
                src={item.iconSrc}
                alt={item.altText}
                width={55}
                height={55}
            />
            <div className="tracking-wide">
                <h3 className="text-shop_light_blue text-2xl font-jersey font-light group-hover:text-shop_white">{item.title}</h3>
                <p className="text-shop_light_blue text-lg font-jersey font-light group-hover:text-shop_white">{item.subtitle}</p>
            </div>
            </div>
        ))}
        </div>
    );
}

export default FooterTop