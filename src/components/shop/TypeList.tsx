import React from 'react';
import { Title } from '../ui/text';
import { Label } from '../ui/label';
import {RadioGroup} from "@heroui/radio";
import { VARIANTS_QUERY_RESULT } from '../../../sanity.types'

interface Props{
  variants: VARIANTS_QUERY_RESULT;
  selectedVariant?: string | null;
  setSelectedVariant: React.Dispatch<React.SetStateAction<string | null>>
}

const TypeList = ({variants, selectedVariant, setSelectedVariant}: Props) => {
  const variantOptions = Array.from(
    new Set(
      variants
        ?.map((item) => item?.variant)
                .filter(
                    (
                        variant
                    ): variant is NonNullable<VARIANTS_QUERY_RESULT[number]['variant']> =>
                        variant !== null
                )
    )
  );

  return (
    <div className="w-full p-5">
        <Title className="text-2xl">Product Types</Title>
        <RadioGroup value={selectedVariant || ""} className="mt-2 space-y-1">
            {variantOptions.map((variant)=>(
                <div 
                    key={variant}
                    className="flex items-center space-x-2 hover:cursor-pointer"
                    onClick={()=>{
                        setSelectedVariant(variant)
                    }}
                >
                    <Label 
                        htmlFor={variant}
                        className={`${selectedVariant === variant ? 
                        "text-shop_red" : 
                        "text-shop_light_blue"} text-lg tracking-wider`}>
                            {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Label>
                </div>
            ))}
            {selectedVariant && (
                <button
                    onClick={() => setSelectedVariant(null)}
                    className="mt-2 underline underline-offset-2 text-left tracking-wider
                    decoration-1 hover:text-shop_white hoverEffect text-shop_light_blue"
                >
                    Reset Selection
                </button>
            )}
        </RadioGroup>
    </div>
  )
}

export default TypeList