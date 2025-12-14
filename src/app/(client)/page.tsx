import React from "react"
import { Button } from "../../components/ui/button"
import Container from "@/components/Container"
import HomeBanner from "@/components/HomeBanner"
import ProductGrid from "@/components/ProductGrid"
import ShopByCategory from "@/components/ShopByCategory"
import { getCategories } from "@/sanity/queries"
import ShopByTheme from "@/components/ShopByTheme"
import LatestBlog from "@/components/LatestBlog"

const Home = async() => {
  const categories = await getCategories(6);
  return <Container>
          <HomeBanner />
          <ProductGrid />
          <ShopByCategory categories={categories} />
          <ShopByTheme />
          <LatestBlog />
        </Container>
}

export default Home;