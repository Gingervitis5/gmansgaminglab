'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

// Remove the Image component from the data array
const data = [
    {
        title: "Email Us",
        subtitle: "average.magic.gamer@gmail.com",
        iconSrc: "/images/Email_Icon.png", // Store only the path
        altText: "Pixel_Logo"
    }
];

const FooterTop = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b border-b-shop_light_blue">
        {data?.map((item, index) => (
            <div key={index} className="flex items-center gap-3 group p-3 transition-colors">
            <Image
                src={item.iconSrc}
                alt={item.altText}
                width={55}
                height={55}
            />
            <div>
                <h3 className="text-shop_light_blue text-lg font-pixelify font-light group-hover:text-shop_white">{item.title}</h3>
                <p className="text-shop_light_blue text-lg font-pixelify font-light group-hover:text-shop_white">{item.subtitle}</p>
            </div>
            </div>
        ))}
        </div>
    );
}

export default FooterTop