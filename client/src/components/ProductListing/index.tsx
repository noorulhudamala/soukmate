// ProductListing.tsx

import React, { useState, useEffect } from "react";
import { getProducts } from "../../api/productApi";
import { IProduct } from "../../interfaces";
import Product from "../Product";
import { Row, Col } from "react-bootstrap";
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
          thumbnail: product?.images_list?.split(";")?.[0],
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
      {/* Render the list of products */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Row className="product-grid d-flex justify-content-center">
            {products.map((product: IProduct) => (
              <Col bsPrefix="col-3">
                <Product key={product.id} product={product} />
              </Col>
            ))}
          </Row>
          <div>
            <button
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Pagination controls */}
    </div>
  );
};

export default ProductListing;
