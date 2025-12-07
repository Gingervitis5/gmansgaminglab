import { cn } from "@/lib/utils"

export const Title=({
    children,
    className
    }:{
    children:React.ReactNode,
    className?:string
    })=>{
    return <h2 className={cn("text-3xl md:text-5xl font-pixelify font-normal text-shop_light_blue tracking-wide", className)}>
                {children}
            </h2>
}
//text outline: [-webkit-text-stroke:1px_#F5D061]