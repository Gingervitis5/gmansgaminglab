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

export { THEMES_QUERY,
         BLOG_QUERY,
        SALES_QUERY,
        PRODUCT_BY_SLUG_QUERY }