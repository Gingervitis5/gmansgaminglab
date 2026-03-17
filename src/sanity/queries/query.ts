import { defineQuery } from "next-sanity";

const THEMES_QUERY = defineQuery(`*[_type == "theme"] | order(title asc)`);

const VARIANTS_QUERY = defineQuery(
`*[_type == "product"] | order(title asc) {
  variant
}`);

const BLOG_QUERY = defineQuery(
`*[_type == "blog" && isLatest == true] | order(publishedAt desc) {
  ...,
  blogcategories[]->{
    title
  }
}`);

const GET_ALL_BLOG = defineQuery(
  `*[_type == 'blog'] | order(publishedAt desc)[0...$quantity]{
  ...,  
     blogcategories[]->{
    title
}
    }
  `
);

const SINGLE_BLOG_QUERY =
  defineQuery(`*[_type == "blog" && slug.current == $slug][0]{
  ..., 
    author->{
    name,
    image,
  },
  blogcategories[]->{
    title,
    "slug": slug.current,
  },
}`);

const BLOG_CATEGORIES = defineQuery(
  `*[_type == "blog"]{
     blogcategories[]->{
    ...
    }
  }`
);

const OTHERS_BLOG_QUERY = defineQuery(`*[
  _type == "blog"
  && defined(slug.current)
  && slug.current != $slug
]|order(publishedAt desc)[0...$quantity]{
...
  publishedAt,
  title,
  mainImage,
  slug,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}`);

const SALES_QUERY = defineQuery(
  `*[_type == "product" && status == "sale"] | order(name asc){
    ..., "categories": categories[]->title
  }`
);

const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc) [0]{
    ..., "categories":categories[]->title
  }`
);

const PRODUCT_CATEGORY_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc){
    "categoryName": categories[]->title
  }`
);

const PRODUCT_THEME_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc){
    "themeName": themes[]->title
  }`
);

const DIMENSIONS_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug]{
    dimensions
  }`
);

const MY_ORDERS_QUERY = defineQuery(`
  *[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
    ...,products[]{
      ...,product->
    }
  }`
);

const ADDRESS_QUERY = defineQuery(`
  *[_type == "address" && email == $email] | order(default desc, name asc){
  _id, name, address, city, state, zip, default
}`
);

export { THEMES_QUERY,
         VARIANTS_QUERY,
         BLOG_QUERY,
         SALES_QUERY,
         PRODUCT_BY_SLUG_QUERY,
         PRODUCT_CATEGORY_QUERY,
         PRODUCT_THEME_QUERY,
         DIMENSIONS_QUERY,
         GET_ALL_BLOG,
         SINGLE_BLOG_QUERY,
         BLOG_CATEGORIES,
         OTHERS_BLOG_QUERY,
         MY_ORDERS_QUERY,
         ADDRESS_QUERY }