"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot } from '../../sanity.types';
import { motion, AnimatePresence } from 'motion/react';
import { urlFor } from '@/sanity/lib/image';
import { image } from '@heroui/theme';
interface Props{
    images?: Array<{
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
        _key: string;
    }>;
    isAvailable?: string;
}

const ImageView = ({images = [], isAvailable}: Props) => {
    const [active, setActive] = useState(images[0]);
    
  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4 mt-4">
        <AnimatePresence mode="wait">
            <motion.div 
                key={active?._key}
                initial={{opacity:0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
                className={`w-full max-h-200 min-h-100 border-2 rounded-md group overflow-hidden
                ${isAvailable === "unavailable" ? "border-shop_red" : "border-shop_light_blue"}`}
            >
                <div className=" items-center justify-center">
                    <Image 
                        src={urlFor(active).url()}
                        alt="productImage"
                        width={700}
                        height={700}
                        priority
                        className={`w-full h-100 max-h-200 min-h-100 object-contain 
                        group-hover:scale-100 hoverEffect rounded-md
                        ${isAvailable === "unavailable" ? "opacity-50" : ""}`}
                    />
                </div>
            </motion.div>
        </AnimatePresence>
        <div>
            {images?.map((image) =>(
                <button key={image?._key}>
                    <Image 
                        src={urlFor(image).url()}
                        alt={`Thumbnail ${image._key}`}
                        width={100}
                        height={100}
                        className="w-full h-auto object-contain"
                    />
                </button>
            ))}
        </div>
    </div>
  )
}

export default ImageView