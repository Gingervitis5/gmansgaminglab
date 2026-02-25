import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import Logo from './Logo'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from './ui/button'

const NoAccessToCart = ({
    details="Log in to view your cart items and checkout. Don't miss out on your favorite products!"
    }:{details?:string}) => {
    return (
        <div className="flex items-center justify-center py-12 md:py-32 p-5">
            <Card className="w-full max-w-md bg-shop_dark border-shop_light_blue border-3">
                <CardHeader className="flex items-center flex-col gap-1">
                    <Logo />
                    <CardTitle className="text-shop_light_blue text-3xl text-center font-extralight tracking-wide">
                        Welcome Back!
                    </CardTitle>
                    <CardContent className="space-y-4 text-shop_light_blue text-lg text-center font-extralight tracking-wide">
                        <p>{details}</p>
                    </CardContent>
                    <SignInButton mode="modal">
                        <Button className="w-full text-shop_light_blue text-lg text-center font-extralight tracking-wide
                        border-2 border-shop_red hover:text-shop_white hover:border-shop_white"
                        >
                            Sign In
                        </Button>
                    </SignInButton>
                </CardHeader>
                <CardFooter className="flex flex-col space-y-2">
                    <div className="text-shop_light_blue text-lg text-center font-extralight tracking-wide">
                        Don&rsquo;t have an account?
                    </div>
                    <SignUpButton mode="modal">
                        <Button className="w-full bg-shop_darkest text-shop_light_blue text-lg text-center font-extralight 
                        tracking-wide border-2 border-shop_red hover:text-shop_white hover:border-shop_white" size="lg">
                        Create an account
                        </Button>
                    </SignUpButton>
                </CardFooter>
            </Card>
        </div>
    )
}

export default NoAccessToCart