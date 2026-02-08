"use client";

import { useState } from "react";
import Container from "./Container";
import { Heart, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
import AddToCartButton from "./AddToCartButton";
import { Product } from "../../sanity.types";
import { useStore } from "../../store";
import PriceView from "./PriceView";

const WishListProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(7);
  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();
  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length));
  };

  const handleResetWishlist = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your wishlist?"
    );
    if (confirmReset) {
      resetFavorite();
      toast.success("Wishlist reset successfully");
    }
  };

  return (
    <Container>
      {favoriteProduct?.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b">
                <tr className="bg-shop_darker text-shop_light_blue text-xl">
                  <th className="p-2 text-left font-extralight">Image</th>
                  <th className="p-2 text-left hidden md:table-cell font-extralight">
                    Category
                  </th>
                  <th className="p-2 text-left hidden md:table-cell font-extralight">Type</th>
                  <th className="p-2 text-left hidden md:table-cell font-extralight">Status</th>
                  <th className="p-2 text-left font-extralight">Price</th>
                  <th className="p-2 text-center md:text-left font-extralight">Action</th>
                </tr>
              </thead>
              <tbody>
                {favoriteProduct
                  ?.slice(0, visibleProducts)
                  ?.map((product: Product) => (
                    <tr key={product?._id} className="border-b">
                      <td className="px-2 py-4 flex items-center gap-2 text-shop_light_blue text-2xl">
                        <X
                          onClick={() => {
                            removeFromFavorite(product?._id);
                            toast.success("Product removed from wishlist");
                          }}
                          size={18}
                          className="hover:text-red-600 hover:cursor-pointer hoverEffect"
                        />
                        {product?.images && (
                          <Link
                            href={`/product/${product?.slug?.current}`}
                            className="border rounded-md group hidden md:inline-flex"
                          >
                            <Image
                              src={urlFor(product?.images[0]).url()}
                              alt={"product image"}
                              width={80}
                              height={80}
                              className="rounded-md group-hover:scale-105 hoverEffect h-20 w-20 object-contain"
                            />
                          </Link>
                        )}
                        <p className="line-clamp-1">{product?.name}</p>
                      </td>
                      <td className="p-2 capitalize hidden md:table-cell text-shop_light_blue">
                        {product?.categories && (
                          <p className="uppercase line-clamp-1 text-base font-medium">
                            {product?.categories?.map((cat) => cat).join(", ")}
                          </p>
                        )}
                      </td>
                      <td className="p-2 capitalize hidden md:table-cell text-lg text-shop_light_blue">
                        {product?.variant}
                      </td>
                      <td
                        className={`p-2 w-24 
                            ${
                                (product?.status as string) === "unavailable"
                                ? "text-shop_red"
                                : "text-shop_light_blue"
                            } 
                            ${
                                (product?.status as string) === "sale"
                                ? "text-shop_orange"
                                : "text-shop_light_blue"
                            } 
                            font-medium text-lg hidden md:table-cell capitalize`}
                      >
                        {product?.status}
                      </td>
                      <td className="p-2 text-lg text-shop_light_blue">
                        <PriceView
                            price={(product?.price as number)}
                            discount={product?.discount ? product?.discount as number : undefined}
                            className="text-xl"
                        />
                      </td>
                      <td className="p-2 text-lg text-shop_light_blue">
                        <AddToCartButton product={product} className="w-full" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-2">
            {visibleProducts < favoriteProduct?.length && (
              <div className="my-5">
                <Button variant="outline" onClick={loadMore}>
                  Load More
                </Button>
              </div>
            )}
            {visibleProducts > 10 && (
              <div className="my-5">
                <Button
                  onClick={() => setVisibleProducts(10)}
                  variant="outline"
                >
                  Load Less
                </Button>
              </div>
            )}
          </div>
          {favoriteProduct?.length > 0 && (
            <Button
              onClick={handleResetWishlist}
              className="mb-5 font-extralight text-xl text-shop_light_blue bg-shop_darkest hover:text-shop_white"
              variant="destructive"
              size="lg"
            >
              Reset Wishlist
            </Button>
          )}
        </>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center text-shop_light_blue">
          <div className="relative mb-4">
            <div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-muted-foreground/20" />
            <Heart
              className="h-12 w-12"
              strokeWidth={1.5}
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extralight tracking-tight">
              Your wishlist is empty
            </h2>
            <p className="text-2xl">
              Items added to your wishlist will appear here
            </p>
          </div>
          <Button asChild className="text-3xl h-10 w-80 bg-shop_darkest text-shop_light_blue border-2 border-shop_red hover:border-shop_white hover:text-shop_white">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </Container>
  );
};

export default WishListProducts;