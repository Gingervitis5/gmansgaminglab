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
        <div className={cn("flex items-center gap-2", className)}>
            {price && !discount && (
                <PriceFormatter 
                    amount={Math.max(price, 0)}
                    className="text-shop_light_blue font-normal"
                />
            )}
            {price && discount && (
                <PriceFormatter 
                    amount={Math.max((price - (discount * price) / 100) , 0)}
                    className="text-shop_orange font-normal"
                />
            )}
        </div>
  );
};

export default PriceView