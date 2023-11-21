// ProductDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductInventory } from "../../api/productInventoryApi";
import { IProduct, IImage, ICart, IProductSize } from "../../interfaces";
import { useStore } from "../../store";
import { ADD_TO_CART, SHOW_CART } from "../../store/actions";
import Accordion from "../Shared/Accordion";
import Cart from "../Shared/Cart";
import Favourites from "../Shared/Favourites";
import StarRating from "../Shared/StarRating";
import ZoomableImage from "../Shared/ZoomabaleImage";
import "./ProductDetail.scss";
import uuid4 from "uuid4";

const cart: ICart = {
  id:'',
  productId: 0,
  name: "",
  sizeId: 0,
  sizeLabel: '',
  quantity: 0,
  maxQuantity: 0,
  price: 0,
  thumbnail: "",
  color: ""
};
const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<IProduct | any>({});
  const [selectedImage, setSelectedImage] = useState<IImage>();
  const [cartData, setCartData] = useState<ICart>(cart);
  const [error, setError] = useState<string>();
  const [images, setImages] = useState([]);
  const { id } = useParams<{ id: string }>();
  const { dispatch, state } = useStore();
  const cartItems = state.cartItems;

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
        const reviews = response?.Reviews?.sort((a:any, b: any) => new Date(a?.review_date) < new Date(b?.review_date));
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
          reviews_count: response?.reviews?.length,
          sizes: response?.Sizes?.map((size: any) => ({
            ...size,
            quantity: size?.ProductInventory?.quantity,
          })),
          reviews: reviews
        };
        setProduct(product);
        setCartData({
          id: "",
          productId: product?.id,
          name: product?.title,
          color: product?.color,
          sizeId: 0,
          sizeLabel: "",
          quantity: 0,
          maxQuantity: 0,
          price: product?.price,
          thumbnail: product?.thumbnail,
        });
      }
    }
    fetchProduct();
  }, [id]);

  const onSelectSize = (size: IProductSize) => {
    setCartData((prevState) => ({ ...prevState, sizeId: size?.id, sizeLabel: size?.sizeLabel, quantity: 1, maxQuantity: size?.quantity  }));
  };
  const addToCartBtnHandler = () => {
    if (cartData?.sizeId === 0) {
      setError("Please select your size");
      return;
    }
    const id = uuid4();
    const cart = cartItems;
    const prodIdx = cart.findIndex(
      (c: ICart) =>
        c.productId === cartData.productId && c.sizeId === cartData.sizeId
    );
    if (prodIdx !== -1) {
      const selectedCart = cart[prodIdx];
      cart[prodIdx] = { ...selectedCart, quantity: selectedCart.quantity + 1, id: id };
    } 
    else {
      cart.push({ ...cartData, id: id })
    }
    dispatch({type: ADD_TO_CART, payload: cart})
    dispatch({type: SHOW_CART, payload: true})
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
                reviewCount={product.reviews?.length}
              />
            </div>
          </div>
          <div className="product-body">
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
                    onClick={() => onSelectSize(size)}
                  >
                    {size?.sizeLabel}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="error">{error}</div>
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
        reviews={product.reviews}
        rating={product.average_rating}
        description={product.description}
        color={product.color}
      />
    </div>
  );
};

export default ProductDetail;
