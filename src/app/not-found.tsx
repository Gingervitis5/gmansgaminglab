import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="bg-shop_darker flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 md:py-32">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo />

          <h2 className="mt-6 text-3xl font-extrabold text-shop_light_blue">
            Looking for something?
          </h2>
          <p className="mt-2 text-sm text-shop_light_blue">
            We&apos;re sorry, but the web address you entered is not a functioning
            page on our site.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            You can go {" "}
            <Link
              href="/"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-shop_light_blue bg-shop_dark_green/80 hover:bg-shop_dark_green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazonOrangeDark hoverEffect"
            >
              back to the home page
            </Link>
            {" "}or{" "}
            <Link
              href="/help"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md text-amazonBlue bg-shop_darkest hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazonBlue"
            >
              visit the help page.
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-shop_light_blue">
            Need help? Visit the{" "}
            <Link
              href="/help"
              className="font-medium text-amazon-blue hover:text-amazon-blue-dark"
            >
              Help section
            </Link>{" "}
            or{" "}
            <Link
              href="/contact"
              className="font-medium text-amazon-blue hover:text-amazon-blue-dark"
            >
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;