import React from 'react'
import { Button } from './ui/button'
import { SignInButton } from '@clerk/nextjs';

const SignIn = () => {
  return (
  <SignInButton mode="modal">
    <button className="text-med font-semibold hover:text-shop_clay hover:cursor-pointer hoverEffect">
      Sign In
    </button>
  </SignInButton>
  );
};

export default SignIn;