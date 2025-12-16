import React from 'react'
import PriceFormatter from './PriceFormatter';
import { cn } from '@/lib/utils';

interface Props{
    price: number | undefined;
    discount: number | undefined;
    className?: string;
}

const PriceView = ({price,discount,className}: Props) => {
  return (
        <div className={cn("flex items-center gap-2 text-lg", className)}>
            {price && !discount && (
                <PriceFormatter 
                    amount={price}
                    className="text-shop_light_blue font-normal"
                />
            )}
            {price && discount && (
                <PriceFormatter 
                    amount={price - (discount * price) / 100 }
                    className="text-shop_orange font-normal"
                />
            )}
        </div>
  );
};

export default PriceView