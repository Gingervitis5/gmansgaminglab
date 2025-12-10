import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Tooltip } from "@heroui/tooltip";
import Image from 'next/image';
interface Props{
    className?: string;
    iconClassName?: string;
}

const socialLink =[
    {
        title: "GitHub",
        href: "https://github.com/Gingervitis5",
        icon: <Github className="w-7 h-7"/>
    },
    {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/graham-mix-011412159/",
        icon: <Linkedin className="w-7 h-7"/>
    },
    {
        title:"Meet the Maker",
        href:"/profile",
        icon:<Image 
                src="/images/Headshot.png" 
                alt="Headshot"
                width={25}
                height={25}    
            />
    }
]

const SocialMedia = ({className, iconClassName}:Props) => {
    return(
        <div className="flex items-center mt-1 gap-4">
            {socialLink?.map((item)=>(
                <Tooltip key={item?.title} content={item?.title} showArrow={true} className={cn("bg-shop_darkest pl-3 pr-3 rounded-2xl font-pixelify border-shop_red border-2", className)}>
                    <div key={item?.title}>
                        <Link
                            key={item?.title} 
                            target="_blank"
                            rel="noopener noreferrer"
                            href={item?.href} 
                            className={cn("hover:text-shop_white", iconClassName)}>
                            {item?.icon}
                        </Link>
                    </div>
                </Tooltip>
            ))}
        </div>
    )
}

export default SocialMedia