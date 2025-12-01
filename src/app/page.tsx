import React from "react"
import { Button } from "../components/ui/button"
import Container from "@/components/Container"

const Home = () => {
  return <Container className="bg-shop_light_pink">
          <h2 className="text-xl font-semibold">Home</h2>
          <p>
            Lorem Ipsum
          </p>
          <Button size="lg">Check out</Button>
        </Container>
}

export default Home;