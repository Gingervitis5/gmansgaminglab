import React from 'react'
import { Product } from '../../sanity.types';
import { getCommandersInfo, getProductCatInfo, getProductThemeInfo } from '@/sanity/queries';
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
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className="flex items-center text-3xl text-shop_light_blue">
                    {product?.name}: Characteristics
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex items-center text-2xl text-shop_light_blue">
                        Categories:{catInfo && catInfo[0]?.categoryName?.map((key, index:number)=>(
                            <span className="ml-1 mr-1" key={index}>
                                {index === catInfo[0]?.categoryName.length-1 ? key : key + ", "}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center text-2xl text-shop_light_blue">
                        Themes:{themeInfo && themeInfo[0]?.themeName?.map((key:string, index:number)=>(
                            <span className="ml-1 mr-1" key={index}>
                                {index === themeInfo[0]?.themeName?.length-1 ? key : key + ", "}
                            </span>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default ProductCharacteristics