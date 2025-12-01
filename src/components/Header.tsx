import React from "react"
import Container from "@/components/Container"
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
    return (
        <header className="bg-color-shop_snow py-5 border-b border-b-black/25">
            <Container className="flex items-center justify-between">
                <Logo />
                <HeaderMenu />
                <div>Others</div>
            </Container>
        </header>
    );
};

export default Header;