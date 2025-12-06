import { cn } from "@/lib/utils"

export const Title=({
    children,
    className
    }:{
    children:React.ReactNode,
    className?:string
    })=>{
    return <h2 className={cn("text-3xl md:text-3xl font-bold text-shop_sand tracking-wide", className)}>
                {children}
            </h2>
}