import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Logo from "./Logo";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const NoAccess = ({
  details = "Log in to view your cart items and checkout. Don't miss out on your favorite products!",
}: {
  details?: string;
}) => {
  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-shop_darker p-4">
      <Card className="w-full max-w-md p-5 text-shop_light_blue bg-shop_darkest border-shop_light_blue border-2">
        <CardHeader className="flex items-center flex-col">
          <Logo />
          <CardTitle className="text-3xl font-extralight text-center">
            Welcome Back!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center font-extralight text-2xl">{details}</p>
          <SignInButton mode="modal">
            <Button className="w-full text-shop_light_blue border-shop_red border-2 text-xl" size="lg">
              Sign in
            </Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-2xl text-center text-shop_light_blue">
            Don&rsquo;t have an account?
          </div>
          <SignUpButton mode="modal">
            <Button variant="outline" className="w-full text-xl bg-shop_darker border-shop_red border-2" size="lg">
              Create an account
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccess;