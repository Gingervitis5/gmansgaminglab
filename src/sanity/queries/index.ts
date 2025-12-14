import { sanityFetch } from "../lib/live";
import { BLOG_QUERY, THEMES_QUERY, SALES_QUERY } from "./query";

export const getCategories = async(quantity?: number) => {
    try{
        const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;
        const {data} = await sanityFetch({query, params:quantity ? { quantity } : {}});
        return data;
    } catch(error){
        console.log("Error fetching categories: ", error);
        return [];
    }
}

export const getAllThemes = async() => {
  try{
    const { data } = await sanityFetch({query: THEMES_QUERY});
    return data ?? [];
  } catch(error) {
    console.log("Error fetching all themes: ",error);
    return [];
  }
};

export const getLatestBlogs = async() => {
  try{
      const { data } = await sanityFetch({query: BLOG_QUERY});
      return data ?? []
  } catch(error) {
      console.log("Error fetching latest blogs: ", error);
      return [];
  }
}

export const getAllSales = async() => {
  try{
      const { data } = await sanityFetch({query: SALES_QUERY});
      return data ?? [];
  }catch(error) {
      console.log("Error fetching sale products: ", error);
      return [];
  }
}