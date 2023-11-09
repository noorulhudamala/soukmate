// ProductDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/productApi";
import { IProduct, IImage } from "../../interfaces";
import "./ProductDetail.scss";

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<IProduct | any>({});
  const [selectedImage, setSelectedImage] = useState<IImage>();
  const [images, setImages] = useState([]);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    async function fetchProduct() {
      if (id) {
        let response = await getProduct(id);
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
          features: response?.features,
          price: response?.price,
          description: response?.product_details,
          thumbnail: response?.images_list?.split("~")?.[0],
        };
        setProduct(product);
      }
    }
    fetchProduct();
  }, [id]);
    
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
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
        <img
          src={selectedImage?.src}
          alt={selectedImage?.alt}
          className="main-image"
        />
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        {/* Add additional product information here */}
      </div>
    </div>
  );
};

export default ProductDetail;
