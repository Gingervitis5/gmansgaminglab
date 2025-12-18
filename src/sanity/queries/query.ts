import { defineQuery } from "next-sanity";

const THEMES_QUERY = defineQuery(`*[_type == "theme"] | order(title asc)`);


const BLOG_QUERY = defineQuery(
`*[_type == "blog" && isLatest == true] | order(publishedAt desc) {
  ...,
  blogcategories[]->{
    title
  }
}`);

const SALES_QUERY = defineQuery(
  `*[_type == "product" && status == "sale"] | order(name asc){
    ..., "categories": categories[]->title
  }`
);

const PRODUCT_BY_SLUG_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`
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

const COMMANDERS_QUERY = defineQuery(
  `*[_type == "product" && slug.current == "demonic-consultation-playmat"] | order(name asc){
    "images": commanders[].asset->url
  }`
);

export { THEMES_QUERY,
         BLOG_QUERY,
         SALES_QUERY,
         PRODUCT_BY_SLUG_QUERY,
         PRODUCT_CATEGORY_QUERY,
         PRODUCT_THEME_QUERY,
         COMMANDERS_QUERY }