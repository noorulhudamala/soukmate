import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getProducts } from "../../api/productApi";
import { IProduct } from "../../interfaces";
import "./FeaturedCarousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from "../Product";
import arrowNext from "../../assets/images/arrow_next.svg";
import arrowPrev from "../../assets/images/arrow_prev.svg";
const FeaturedCarousel: React.FC = () => {
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

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    className: "carousel",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="App featured-carousel" style={{ background: "" }}>
      <h2>Featured Products</h2>
      <Slider {...settings}>
        {products.map((product, idx) => (
          <div className="p-4">
            <Product key={product.id} product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
      <img className="slick-arrow" src={arrowPrev} alt="arrow_prev" />
    </div>
  );
}

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
      <img className="slick-arrow" src={arrowNext} alt="arrow_next" />
    </div>
  );
}

export default FeaturedCarousel;
