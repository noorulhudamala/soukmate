import React from "react";
import { IProduct } from "../../interfaces";
import "./Product.scss";

type ProductProps = {
  product: IProduct;
};
const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="product-item">
      <div className="img-container">
        <img src={`${product?.thumbnail}.jpg`} alt={product.title} />
      </div>
      <div className="">
        <h5>{product.title}</h5>
        <span>${product.price}</span>
      </div>
    </div>
  );
};

export default Product;
