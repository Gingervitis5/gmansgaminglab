"use client";

import React, { useEffect, useState } from "react"
import Container from "@/components/Container"
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import SignInComponent from "./SignIn";
import MobileMenu from "./MobileMenu";
import { Pixelify_Sans } from 'next/font/google';
import { ClerkLoaded, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Logs } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { MY_ORDERS_QUERY } from "@/sanity/queries/query";
const pixelify = Pixelify_Sans({
    subsets:['cyrillic'],
    weight:['400']
})

const Header = () => {
    const { user, isSignedIn } = useUser();
    const [ordersCount, setOrdersCount] = useState(0);

    useEffect(() => {
        const userId = user?.id;
        if (!isSignedIn || !userId) {
            setOrdersCount(0);
            return;
        }

        let isMounted = true;

        const fetchOrderCount = async () => {
            try {
                const orders = await client.fetch<unknown[]>(MY_ORDERS_QUERY, { userId });
                if (isMounted) {
                    setOrdersCount(Array.isArray(orders) ? orders.length : 0);
                }
            } catch (error) {
                console.error("Error fetching orders for header:", error);
                if (isMounted) {
                    setOrdersCount(0);
                }
            }
        };

        fetchOrderCount();

        return () => {
            isMounted = false;
        };
    }, [isSignedIn, user?.id]);

    return (
        <header className="sticky top-0 z-50 bg-shop_dark/95 py-5 border-b-5 border-shop_light_blue backdrop-blur-md">
            <Container className="flex items-center justify-between">
                <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
                    <MobileMenu />
                    <Logo />
                </div>
                <HeaderMenu />
                <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
                    <CartIcon />
                    <FavoriteButton className="w-7 h-7"/>
                    {isSignedIn && (
                        <Link
                            href="/orders"
                            className="group relative text-shop_light_blue hover:text-shop_white hoverEffect">
                            <Logs />
                            <span className="absolute -top-1 -right-1 bg-shop_red text-white h-4 w-4 
                                            rounded-full text-xs font-light font-poppins flex items-center justify-center">
                                {ordersCount}
                            </span>
                        </Link>
                    )}
                    <ClerkLoaded>
                        {isSignedIn && <UserButton />}
                        {!isSignedIn && <SignInComponent />}
                    </ClerkLoaded>
                </div>
            </Container>
        </header>
    );
};

export default Header;