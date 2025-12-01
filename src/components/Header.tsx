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
const pixelify = Pixelify_Sans({
    subsets:['cyrillic'],
    weight:['400']
})

const Header = () => {
    return (
        <header className="bg-color-shop_white py-5 border-b border-b-black/25">
            <Container className="flex items-center justify-between">
                <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
                    <MobileMenu />
                    <Logo />
                </div>
                <HeaderMenu />
                <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
                    <SearchBar />
                    <CartIcon />
                    <FavoriteButton />
                    <SignIn />
                </div>
            </Container>
        </header>
    );
};

export default Header;