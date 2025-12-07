import { cn } from "@/lib/utils"

export const Title=({
    children,
    className
    }:{
    children:React.ReactNode,
    className?:string
    })=>{
    return <h2 className={cn("text-3xl md:text-4xl font-pixelify font-extrabold [-webkit-text-stroke:1px_#F5D061] text-shop_red tracking-wide", className)}>
                {children}
            </h2>
}