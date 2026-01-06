import React from 'react';
import { Theme } from '../../../sanity.types';
import { Title } from '../ui/text';
import { Label } from '../ui/label';
import {RadioGroup, Radio} from "@heroui/radio";
import { THEMES_QUERY_RESULT } from '../../../sanity.types'

interface Props{
  themes: THEMES_QUERY_RESULT;
  selectedTheme?: string | null;
  setSelectedTheme: React.Dispatch<React.SetStateAction<string | null>>
}

const ThemeList = ({themes, selectedTheme, setSelectedTheme}: Props) => {
  return (
    <div className="w-full p-5">
        <Title className="text-2xl">Product Themes</Title>
        <RadioGroup value={selectedTheme || ""} className="mt-2 space-y-1">
            {themes?.map((theme)=>(
                <div 
                    key={theme?._id}
                    className="flex items-center space-x-2 hover:cursor-pointer"
                    onClick={()=>{
                        setSelectedTheme(theme?.slug?.current as string)
                    }}
                >
                    <Radio 
                        value={theme?.slug?.current as string}
                        id={theme?.slug?.current}
                        className="rounded-sm " size="lg"/>
                    <Label 
                        htmlFor={theme?.slug?.current}
                        className={`${selectedTheme === theme?.slug?.current ? 
                        "text-shop_red" : 
                        "text-shop_light_blue"} text-lg tracking-wider`}>
                            {theme?.title}
                    </Label>
                </div>
            ))}
            {selectedTheme && (
                <button
                    onClick={() => setSelectedTheme(null)}
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

export default ThemeList