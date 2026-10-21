import React from "react";
import { Helmet } from "react-helmet";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

// same grid as the home page, so search and the cart badge behave identically
export default function Products() {
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <FeaturedProducts />
    </>
  );
}
