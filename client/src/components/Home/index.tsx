import React from "react";
import ProductListing from "../ProductListing";
import Banner from "../Banner";
import FeaturedCarousel from "../FeaturedCarousel";

const ProductPage: React.FC = () => {
  return (
    <div>
      <Banner />
      <FeaturedCarousel/>
      <ProductListing />
      {/* <ProductDetail product={product} /> */}
    </div>
  );
};

export default ProductPage;
