import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import { getMyOrders } from '@/sanity/queries';
import React from 'react'
import Container from '@/components/Container';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollAreaScrollbar } from '@/components/ui/scroll-area';
import { Table, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileX } from 'lucide-react';
import OrdersComponent from '@/components/OrdersComponent';

const OrdersPage = async() => {
    const {userId} = await auth();
    if(!userId){
        return redirect("/sign-in");
    }

    const orders = await getMyOrders(userId);
    console.log(orders);
  return (
    <div>
        <Container className="py-10">
            {orders?.length ? (
                <Card
                    className="w-full bg-shop_darkest border-none rounded-md">
                    <CardTitle
                        className="px-10 bg-shop_darkest text-shop_light_blue text-4xl font-light mb-4">
                        Order List
                    </CardTitle>
                    <CardContent>
                        <ScrollArea>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className="w-[100px] md:w-auto text-xl text-shop_light_blue">
                                        Order Number
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell text-xl text-shop_light_blue">
                                        Date
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell text-xl text-shop_light_blue">
                                        Customer
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell text-xl text-shop_light_blue">
                                        Email
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell text-xl text-shop_light_blue">
                                        Total
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell text-xl text-shop_light_blue">
                                        Status
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell text-xl text-shop_light_blue">
                                        Invoice Number
                                    </TableHead>
                                    <TableHead className="text-xl text-center text-shop_light_blue">
                                        Action
                                    </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <OrdersComponent orders={orders}/>
                            </Table>
                            <ScrollAreaScrollbar orientation="vertical" />
                        </ScrollArea>
                    </CardContent>
                </Card>
            ) : (
          <div className="flex flex-col items-center justify-center py-15 px-4 sm:px-6 lg:px-8">
            <FileX className="h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-3xl font-extralight text-shop_light_blue">
              No orders found
            </h2>
            <p className="mt-2 text-2xl text-shop_light_blue text-center max-w-md">
              It looks like you haven&apos;t placed any orders yet. Start
              shopping to see your orders here!
            </p>
            <Button asChild className="mt-6 bg-shop_darkest border-2 border-shop_red rounded-full text-3xl text-shop_light_blue hover:text-shop_white hoverEffect">
              <Link href="/" className="">
                <div className="px-5">
                    Browse Products
                </div>
              </Link>
            </Button>
          </div>
        )}
        </Container>
    </div>
  )
}

export default OrdersPage