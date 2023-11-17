// ProductDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductInventory } from "../../api/productInventoryApi";
import { IProduct, IImage, ICart, IProductSize } from "../../interfaces";
import Accordion from "../Shared/Accordion";
import Cart from "../Shared/Cart";
import Favourites from "../Shared/Favourites";
import StarRating from "../StarRating";
import ZoomableImage from "../ZoomabaleImage";
import "./ProductDetail.scss";

const cart: ICart = {
  productId: 0,
  name: "",
  sizeId: 0,
  quantity: 0,
  price: 0,
  thumbnail: "",
};
const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<IProduct | any>({});
  const [selectedImage, setSelectedImage] = useState<IImage>();
  const [cartData, setCartData] = useState<ICart>(cart);
  const [error, setError] = useState<string>();
  const [images, setImages] = useState([]);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    async function fetchProduct() {
      if (id) {
        let response = await getProductInventory(id);
        let imgs = response?.images_list?.split("~");
        const imageList = imgs.map((img: string, idx: number) => ({
          id: idx,
          src: img,
          alt: `product-img-${idx}`,
        }));
        setImages(imageList);
        setSelectedImage(imageList?.[0]);
        const product: IProduct = {
          id: response?.id,
          title: response?.title,
          brand: response?.brand,
          price: response?.price,
          description: response?.description,
          thumbnail: response?.images_list?.split("~")?.[0],
          availability: response?.availability,
          color: response?.color,
          category: response?.category,
          average_rating: response?.average_rating,
          reviews_count: response?.reviews_count,
          sizes: response?.Sizes?.map((size: any) => ({
            ...size,
            quantity: size?.ProductInventory?.quantity,
          })),
        };
        setProduct(product);
        setCartData({
          productId: response?.id,
          name: response?.title,
          sizeId: 0,
          quantity: 1,
          price: response?.price,
          thumbnail: response?.thumbnail,
        });
      }
    }
    fetchProduct();
  }, [id]);

  const onSelectSize = (sizeId: number) => {
    setCartData((prevState) => ({ ...prevState, sizeId: sizeId }));
  };
  const addToCartBtnHandler = () => {
    if (cartData?.sizeId === 0) {
      setError("Please select your size");
      return;
    }
    const cart: any = JSON.parse(localStorage.getItem("cart") || "[]");
    const prodIdx = cart.findIndex(
      (c: ICart) =>
        c.productId === cartData.productId && c.sizeId === cartData.sizeId
    );
    if (prodIdx !== -1) {
      const selectedCart = cart[prodIdx];
      cart[prodIdx] = { ...selectedCart, quantity: selectedCart.quantity + 1 };
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.setItem("cart", JSON.stringify([...cart, cartData]));
    }
  };
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="product-container">
      <div className="product-detail-container">
        <div className="thumbnails-container">
          {images.map((image: IImage) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              className={`thumbnail ${
                selectedImage?.id === image.id ? "selected" : ""
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        <div className="main-image-container">
          <ZoomableImage
            src={selectedImage?.src}
            alt={selectedImage?.alt}
            className="main-image"
          />
        </div>
        <div className="product-info">
          <div className="product-header">
            <h1>{product.title}</h1>
            <div className="w-100">
              <span>${product.price}</span>
              <StarRating
                rating={product.average_rating}
                starSize={20}
                reviewCount={product.reviews_count}
              />
            </div>
          </div>
          <div className="product-body">
            <div className="">
              <span className="product-subHeading">Description:</span>
              <p>{product.description}</p>
            </div>
            <div className="description-container">
              <span className="product-subHeading">Availability:</span>
              <span>{product.availability}</span>
            </div>
            <div className="description-container">
              <span className="product-subHeading">Color:</span>
              <span>{product.color}</span>
            </div>
            <div className="d-flex description-container sizes-container">
              <span className="product-subHeading">Sizes:</span>
              <div className="row">
                {product?.sizes?.map((size: IProductSize) => (
                  <div
                    key={size.id}
                    className={`size ${
                      cartData?.sizeId === size.id ? "selected" : ""
                    }`}
                    onClick={() => onSelectSize(size.id)}
                  >
                    {size?.sizeLabel}
                  </div>
                ))}
              </div>
            </div>
            <div className="error">
              <span>{error}</span>
            </div>
          </div>
          <div className="row action-container">
            <button className="mx-1 col-9" onClick={addToCartBtnHandler}>
              <Cart fill="#fff" />
              Add to Cart
            </button>
            {/* <div className="col-1"></div> */}
            <button className="col-2 fav-btn">
              <Favourites outline="#000" />
            </button>
          </div>
        </div>
      </div>
      <Accordion
        reviews={product.reviews_count}
        rating={product.average_rating}
        description={product.description}
        color={product.color}
      />
    </div>
  );
};

export default ProductDetail;
