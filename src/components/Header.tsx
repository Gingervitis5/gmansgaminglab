import React from "react"
import Container from "@/components/Container"
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import SignIn from "./SignIn";
import MobileMenu from "./MobileMenu";
import { Pixelify_Sans } from 'next/font/google';
import { auth, currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Logs } from "lucide-react";
import { getMyOrders } from "@/sanity/queries";
const pixelify = Pixelify_Sans({
    subsets:['cyrillic'],
    weight:['400']
})

const Header = async() => {
    const user = await currentUser();
    const {userId} = await auth();
    let orders = null;
    if(userId) {
        orders = await getMyOrders(userId);
    }
    return (
        <header className="sticky top-0 z-50 bg-shop_dark/95 py-5 border-b-5 border-shop_light_blue backdrop-blur-md">
            <Container className="flex items-center justify-between">
                <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
                    <MobileMenu />
                    <Logo />
                </div>
                <HeaderMenu />
                <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
                    <SearchBar />
                    <CartIcon />
                    <FavoriteButton className="w-7 h-7"/>
                    <ClerkLoaded>
                        <SignedIn>
                            <Link
                                href="/orders"
                                className="group relative text-shop_light_blue hover:text-shop_white hoverEffect">
                                <Logs />
                                <span className="absolute -top-1 -right-1 bg-shop_red text-white h-4 w-4 
                                                rounded-full text-xs font-light font-poppins flex items-center justify-center">
                                    {orders?.length ? orders?.length : 0}
                                </span>
                            </Link>
                            <UserButton />
                        </SignedIn>
                        {!user && <SignIn />}
                    </ClerkLoaded>
                </div>
            </Container>
        </header>
    );
};

export default Header;