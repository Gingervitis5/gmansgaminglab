import React from 'react'
import { Product } from '../../sanity.types';
import { getDimensionInfo, getProductCatInfo, getProductThemeInfo } from '@/sanity/queries';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from './ui/carousel';
import { SubTitle } from './ui/text';

const ProductCharacteristics = async(
    {product,
    }:{
        product: Product | null | undefined
    }) => {
    const catInfo = await getProductCatInfo(product?.slug?.current as string);
    const themeInfo = await getProductThemeInfo(product?.slug?.current as string);
    const dimInfo = await getDimensionInfo(product?.slug?.current as string);
    const categories = catInfo?.[0]?.categoryName ?? [];
    const themes = themeInfo?.[0]?.themeName ?? [];
    const dimensions = dimInfo?.[0]?.dimensions ?? "";

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className="flex items-center text-3xl text-shop_light_blue">
                    {product?.name}: Characteristics
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex items-center text-2xl text-shop_light_blue">
                        Categories:{categories.map((key: string | null, index:number)=>(
                            <span className="ml-1 mr-1" key={index}>
                                {index === categories.length-1 ? (key ?? "") : (key ?? "") + ", "}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center text-2xl text-shop_light_blue">
                        Themes:{themes.map((key: string | null, index:number)=>(
                            <span className="ml-1 mr-1" key={index}>
                                {index === themes.length-1 ? (key ?? "") : (key ?? "") + ", "}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center text-2xl text-shop_light_blue">
                        Dimensions:{" "}{dimensions}
                    </div>
                    <div className="flex items-center text-2xl text-shop_light_blue">
                        The watermark will be removed from the final image.
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default ProductCharacteristics