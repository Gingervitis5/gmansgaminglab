import Container from '@/components/Container';
import NoSalesAvailable from '@/components/NoProductAvailable';
import ProductCard from '@/components/ProductCard';
import { Title } from '@/components/ui/text';
import { getAllSales } from '@/sanity/queries';
import React from 'react'

const DealPage = async() => {
    const products = await getAllSales();
  return (
    <div className="py-10">
        <Container>
            <Title className="mb-5 underline underline-offset-4 decoration-1 uppercase tracking-wider">Sales on Current Products</Title>
            {products.length >= 1 ?
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {products?.map((product)=>(
                    // @ts-ignore
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
            : <NoSalesAvailable />}
        </Container>
    </div>
  );
};

export default DealPage