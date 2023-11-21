// ProductListing.tsx

import React, { useState, useEffect } from "react";
import { getProducts } from "../../api/productApi";
import { IProduct } from "../../interfaces";
import Product from "../Product";
import { Row, Col } from "react-bootstrap";
import arrowNext from "../../assets/images/arrow_next.svg";
import arrowPrev from "../../assets/images/arrow_prev.svg";
import "./ProductListing.scss";

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await getProducts();

        const products: IProduct[] = response?.products.map((product: any) => ({
          id: product?.id,
          title: product?.title,
          brand: product?.brand,
          features: product?.features,
          price: product?.price,
          description: product?.product_details,
          thumbnail: product?.images_list?.split("~")?.[0],
          availability: product?.availability,
          color: product?.color,
          category: product?.category,
          average_rating: product?.average_rating,
          reviews_count: product?.reviews_count,
        }));
        setProducts(products);
        setTotalPages(response.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [currentPage]);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
          <>
            <h2 className="heading">All Products</h2>
          <Row className="product-grid d-flex justify-content-center">
            {products.map((product: IProduct) => (
              <Col bsPrefix="col-3">
                <Product key={product.id} product={product} />
              </Col>
            ))}
          </Row>
          <div className="product-pagination">
            <span
              className="prev"
                onClick={() => setCurrentPage((prevPage) => {
                  if (prevPage > 1)
                    return prevPage - 1
                  return prevPage
                })}
            >
              <img className="arrow" src={arrowPrev} alt="arrow previous" />
            </span>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <span
              className="next"
                onClick={() => setCurrentPage((prevPage) => {
                  if (prevPage < totalPages)
                  return prevPage + 1
                return prevPage
              })}
            >
              <img className="arrow" src={arrowNext} alt="arrow next" />
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListing;
