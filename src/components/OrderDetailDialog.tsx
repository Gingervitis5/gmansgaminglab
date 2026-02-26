import { MY_ORDERS_QUERY_RESULT } from "../../sanity.types";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";

interface OrderDetailsDialogProps {
  order: MY_ORDERS_QUERY_RESULT[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl! max-h-[90vh] overflow-y-scroll font-extralight text-shop_light_blue text-xl bg-shop_darkest">
        <DialogHeader>
          <DialogTitle className="text-3xl font-extralight">Order Details - {order?.orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="">
          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {order.orderDate && new Date(order.orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`capitalize px-2 py-0.5 rounded-full font-medium 
                        ${
                          order.status === "paid"
                            ? "bg-shop_green text-shop_white"
                            : "bg-shop_orange text-shop_white"
                        }`}>
              {order.status}
            </span>
          </p>
          <p>
            <strong>Invoice Number:</strong> {order?.invoice?.number}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xl text-shop_light_blue">Product</TableHead>
              <TableHead className="text-xl text-shop_light_blue">Quantity</TableHead>
              <TableHead className="text-xl text-shop_light_blue">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.products?.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2">
                  {product?.product?.images && (
                    <Image
                      src={urlFor(product?.product?.images[0]).url()}
                      alt="productImage"
                      width={50}
                      height={50}
                      className="border rounded-sm"
                    />
                  )}

                  {product?.product && product?.product?.name}
                </TableCell>
                <TableCell>{product?.quantity}</TableCell>
                <TableCell>
                  <PriceFormatter
                    amount={product?.product?.price}
                    className="text-xl text-shop_light_blue"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right flex items-center justify-end">
          <div className="w-44 flex flex-col gap-1">
            {order?.amountDiscount !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Discount: </strong>
                <PriceFormatter
                  amount={order?.amountDiscount}
                  className="text-xl text-shop_light_blue"
                />
              </div>
            )}
            {order?.amountDiscount !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Subtotal: </strong>
                <PriceFormatter
                  amount={
                    (order?.totalPrice as number) +
                    (order?.amountDiscount as number)
                  }
                  className="text-xl text-shop_light_blue"
                />
              </div>
            )}
            <div className=" text-2xl w-full flex items-center justify-between">
              <strong>Total: </strong>
              <PriceFormatter
                amount={order?.totalPrice}
                className="text-2xl text-shop_light_blue"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;