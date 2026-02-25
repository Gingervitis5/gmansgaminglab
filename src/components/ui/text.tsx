import { cn } from "@/lib/utils"

export const Title=({
    children,
    className
    }:{
        children:React.ReactNode,
        className?:string
    })=>{
        return <h2 className={cn("text-3xl font-jersey font-light text-shop_light_blue tracking-wide", className)}>
                    {children}
                </h2>
}

export const SubTitle=({
    children,
    className
    }:{
        children:React.ReactNode,
        className?:string
    })=>{
        return <h3 className={cn("text-2xl g md:text-2xl font-jersey font-extralight text-shop_light_blue tracking-wide", className)}>
                    {children}
                </h3>
}

export const SubText=({
    children,
    className
    }:{
        children:React.ReactNode,
        className?:string
    })=>{
        return (<p className={cn("font-jersey font-light text-lg text-shop_light_blue tracking-wide", className)}>{children}</p>);
}
//text outline: [-webkit-text-stroke:1px_#F5D061]