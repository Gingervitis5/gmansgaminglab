import React from 'react'
import { Category } from '../../../sanity.types'
import { Title } from '../ui/text';
import {RadioGroup, Radio} from "@heroui/radio";
import { Label } from '../ui/label';

interface Props{
    categories: Category[];
    selectedCategory?: string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({categories, selectedCategory, setSelectedCategory} : Props) => {
  return (
    <div className="w-full p-5">
        <Title className="text-2xl">Product Categories</Title>
        <RadioGroup value={selectedCategory || ""} className="mt-2 space-y-1">
            {categories?.map((category)=>(
                <div 
                    key={category?._id}
                    className="flex items-center space-x-2 hover:cursor-pointer"
                    onClick={()=>{
                        setSelectedCategory(category?.slug?.current as string)
                    }}
                >
                    <Radio 
                        value={category?.slug?.current as string}
                        id={category?.slug?.current}
                        className="rounded-sm " size="lg"/>
                    <Label 
                        htmlFor={category?.slug?.current}
                        className={`${selectedCategory === category?.slug?.current ? 
                        "text-shop_red" : 
                        "text-shop_light_blue"} text-lg tracking-wider`}>
                            {category?.title}
                    </Label>
                </div>
            ))}
            {selectedCategory && (
                <button
                    onClick={() => setSelectedCategory(null)}
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

export default CategoryList