import React from 'react'
import { getAllThemes, getCategories } from '@/sanity/queries';
import Shop from '@/components/Shop';

const ShopPage = async() => {
    const categories = await  getCategories();
    const themes = await getAllThemes();
  return (
    <div>
        <Shop categories={categories} themes={themes}/>
    </div>
  );
};

export default ShopPage