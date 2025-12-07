import { Link } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

const Logo = ({className}:{className?:string}) => {
  return (
        <Image 
        src="/images/GMan Logo.png" 
        alt="Pixel Logo"
        width={330}
        height={130}
        />
  )
}

export default Logo