import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../interfaces";
import "./Product.scss";

type ProductProps = {
  product: IProduct;
};
const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="product-item">
      <Link
        to={`/product/${product.id}`}
      >
        <div className="img-container">
          <img src={`${product?.thumbnail}`} alt={product.title} />
        </div>
        <div className="product-description">
          <h5>{product.title}</h5>
          <span>${product.price}</span>
        </div>
      </Link>
      <div className="product-action">
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
