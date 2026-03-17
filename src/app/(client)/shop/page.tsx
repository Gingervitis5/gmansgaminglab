import React from 'react'
import { getAllThemes, getAllVariants, getCategories } from '@/sanity/queries';
import Shop from '@/components/Shop';

const ShopPage = async() => {
    const categories = await  getCategories();
    const themes = await getAllThemes();
    const variants = await getAllVariants();
  return (
    <div className="py-5">
        <Shop categories={categories} themes={themes} variants={variants}/>
    </div>
  );
};

export default ShopPage