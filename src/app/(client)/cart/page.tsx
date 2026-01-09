"use client"
import { SignIn } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { useStore } from '../../../../store';
import { useAuth, useUser } from '@clerk/nextjs';
import { Address } from '../../../../sanity.types';
import Container from '@/components/Container';
import NoAccessToCart from '@/components/NoAccessToCart';
import EmptyCart from '@/components/EmptyCart';
import { ShoppingBag, Trash } from 'lucide-react';
import { Title } from '@/components/ui/text';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import Image from "next/image";
import toast from 'react-hot-toast';
import PriceFormatter from '@/components/PriceFormatter';
import QuantityButton from '@/components/QuantityButton';
import { Button } from '@/components/ui/button';
import AddToWishlistButton from '@/components/AddToWishlistButton';
import { client } from '@/sanity/lib/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {RadioGroup, Radio} from "@heroui/radio";
import { Label } from '@/components/ui/label';

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const fetchAddresses=async()=>{
    setLoading(true);
    try{
      const query=`*[_type == "address"] | order(publishedAt desc)`;
      const data = await client.fetch(query);
      setAddresses(data);
      const defaultAddress = data.find((addr: Address) => addr.default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]); // Optional: select first address if no default
      }
    } catch(error){
      console.log("Error fetching addresses: ", error)
    } finally{
      setLoading(false);
    }
  };
  useEffect(()=>{
    fetchAddresses();
  }, [])
  const handleResetCart=()=>{
    const confirmed = window.confirm("Are you sure you want to clear your cart?");
    if(confirmed){
      resetCart();
      toast.success("Your cart has been cleared.");
    }
  };
  return (
    <div className="bg-shop_darker pb-52 md:pb-10">
      {isSignedIn ? 
        <Container>
          {groupedItems?.length ? 
            <>
              <div className="flex items-center gap-2 py-5">
                  <ShoppingBag className="text-shop_light_blue" size={35}/>
                  <Title className="text-4xl">Shopping Cart</Title>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                <div className="lg:col-span-2 rounded-lg">
                  <div className="border-2 border-shop_light_blue text-shop_light_blue rounded-md">
                    {groupedItems?.map(({product})=>{
                      const itemCount = getItemCount(product?._id)
                      return (
                        <div key={product?._id} className="flex items-center justify-between gap-5 border-b-2 
                        p-2.5 last:border-b-0 border-shop_light_blue text-shop_light_blue rounded-md">
                          <div className="flex flex-1 items-start gap-2">
                            {product?.images && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="border border-shop_light_blue p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                              >
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt="productImage"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-64 md:w-80 h-32 md:h-60 object-cover rounded-md group-hover:scale-105 hoverEffect"
                                ></Image>
                              </Link>
                            )}
                            <div className="h-full flex flex-1 flex-col justify-between py-1">
                              <div className="flex flex-col gap-0.5 mg:gap-1.5">
                                <Title className="line-clamp-1">{product?.name}</Title>
                                <p className="text-xl capitalize tracking-wide">
                                  Variant: {" "}
                                  <span className="">
                                    {product?.variant}
                                  </span>
                                </p>
                                {product?.status !== undefined ? 
                                  <p className="text-xl capitalize tracking-wide">
                                    Status: {" "}
                                    <span className="">
                                      {product?.status}
                                    </span>
                                  </p> :
                                  <></>
                                }
                              </div>
                              <div className="flex flex-col items-start justify-between p-0.5 md:p-1">
                                <PriceFormatter 
                                  amount={(product?.price as number) * itemCount}
                                  className="text-2xl"
                                />
                                <QuantityButton 
                                  product={product}
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <AddToWishlistButton
                                product={product}
                              />
                                <Trash 
                                  onClick={() => {
                                    deleteCartProduct(product?._id);
                                    toast.success("Product removed from cart.")
                                  }}
                                  className="hover:text-shop_white"
                                />
                              </div>
                          </div>
                        </div>
                      )
                    })}
                    <Button
                      onClick={handleResetCart}
                      className="m-5 tracking-wider text-xl text-shop_light_blue bg-shop_darkest hover:text-shop_white"
                      variant="destructive"
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="lg:col-span-1 text-shop_light_blue">
                    <div className="hidden md:inline-block w-full bg-shop_darkest p-6 rounded-lg">
                      <h2 className="text-3xl mb-4">
                        Order Summary
                      </h2>
                      <div className="space-y-4">
                        <div className="text-2xl flex items-center justify-between">
                          <span >Subtotal:{" "}</span>
                          <PriceFormatter amount={getSubTotalPrice()}/>
                        </div>
                        <div className="text-2xl flex items-center justify-between">
                          <span >Discount:{" "}</span>
                          <PriceFormatter amount={getSubTotalPrice()-getTotalPrice()}/>
                        </div>
                         <div className="border-t-2 border-shop_light_blue text-3xl flex items-center justify-between">
                          <span >Total:{" "}</span>
                          <PriceFormatter amount={getTotalPrice()}/>
                        </div>
                        <Button
                          className="text-shop_light_blue text-xl bg-shop_darkest w-full rounded-full tracking-wide
                          border-2 border-shop_red hover:text-shop_white hover:border-shop_white hoverEffect"
                          size="lg"
                        >
                          {loading ? "Please wait..." : "Proceed to Checkout"}
                        </Button>
                      </div>
                    </div>
                    {addresses && 
                      <div>
                        <Card className="text-xl bg-shop_darkest rounded-md mt-5 border-0 text-shop_light_blue">
                          <CardHeader>
                            <CardTitle className="font-extralight tracking-wide text-3xl">Select Delivery Address</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <RadioGroup 
                              defaultValue={addresses
                                ?.find((addr) => addr.default)
                                ?._id.toString()}
                            >
                              {addresses?.map((address)=>(
                                <div 
                                  key={address?._id}
                                  onClick={()=>setSelectedAddress(address)}
                                  className={`flex items-center space-x-2 mb-4 cursor-pointer
                                    ${selectedAddress?._id === address?._id && "text-shop_white underline"}`}
                                >
                                  <Label 
                                    htmlFor={`address-${address?._id}`}
                                    className="grid gap-1 flex-1"
                                  >
                                    <span className="text-xl">{address?.name}</span>
                                    <span className="text-lg">
                                      {address.address}, {address.city}, {" "}
                                      {address.state}, {address.zip}
                                    </span>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                            <Button className="w-full mt-4 text-xl text-shop_light_blue bg-shop_darkest border-2
                            border-shop_red hover:text-shop_white hover:border-shop_white rounded-full">
                              Add New Address
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    }
                  </div>
                </div>
                {/* Order summary for mobile view*/}
                 <div className="md:hidden fixed bottom-0 left-0 w-full text-shop_light_blue bg-shop_darkest pt-2">
                  <div className="bg-shop_darkest p-4 rounded-lg border mx-4 text-3xl">
                    <h2>Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xl">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex items-center justify-between text-xl">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <div className="border-t-2 border-shop_light_blue flex items-center justify-between font-extralight text-3xl">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg font-extralight text-shop_light_blue"
                        />
                      </div>
                      <Button
                        className="text-shop_light_blue text-xl bg-shop_darkest w-full rounded-full tracking-wide
                          border-2 border-shop_red hover:text-shop_white hover:border-shop_white hoverEffect"
                        size="lg"
                        disabled={loading}
                        //onClick={handleCheckout}
                      >
                        {loading ? "Please wait..." : "Proceed to Checkout"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </> : 
            <EmptyCart />
          }
        </Container> : 
        <NoAccessToCart />
      }
    </div>
  )
}

export default CartPage