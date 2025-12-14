import React from 'react'
import { Button } from './ui/button'
import { SignInButton } from '@clerk/nextjs';

const SignIn = () => {
  return (
  <SignInButton mode="modal">
    <button className="text-shop_light_blue text-2xl font-light hover:text-shop_white hover:cursor-pointer hoverEffect">
      Sign In
    </button>
  </SignInButton>
  );
};

export default SignIn;