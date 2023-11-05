import React from "react";
import ProductListing from "../ProductListing";
import Banner from "../Banner";

const ProductPage: React.FC = () => {
  return (
    <div>
      <Banner/>
      <ProductListing />
    </div>
  );
};

export default ProductPage;
