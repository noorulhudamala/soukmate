export interface IProduct {
  id: number;
  title: string;
  brand: string;
  description: string;
  price: number;
  thumbnail: string;
  availability: string;
  color: string;
  category: string;
  average_rating: number;
  reviews_count: number;
  sizes?: IProductSize[];
  reviews?: IReview[];
}

export interface IImage {
  id: number;
  src: string;
  alt: string;
}

export interface ICart {
  id: string;
  productId: number;
  name: string;
  sizeId: number;
  sizeLabel: string;
  quantity: number;
  maxQuantity: number;
  price: number;
  thumbnail: string;
  color: string;
}

export interface IProductSize {
  id: number;
  sizeLabel: string;
  quantity: number;
}

export interface IReview {
  id: number;
  productId: number;
  review_rating: number;
  review_text: string;
  review_title: string;
  reviewer_name: string;
  review_date: Date;
}