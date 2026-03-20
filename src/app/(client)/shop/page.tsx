import React, { Suspense } from 'react'
import { getAllThemes, getAllVariants, getCategories } from '@/sanity/queries';
import Shop from '@/components/Shop';

const ShopPage = async() => {
    const categories = await  getCategories();
    const themes = await getAllThemes();
    const variants = await getAllVariants();
  return (
    <div className="py-5">
        <Suspense fallback={<div className="text-shop_light_blue px-4">Loading shop...</div>}>
          <Shop categories={categories} themes={themes} variants={variants}/>
        </Suspense>
    </div>
  );
};

export default ShopPage