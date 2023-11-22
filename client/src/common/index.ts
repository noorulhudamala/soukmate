import { ICart } from "../interfaces";

export const addToCart = (cartData: ICart) => {
    const { productId, sizeId, quantity} = cartData;
    // Retrieve cart from local storage
    let cart: ICart[] = JSON.parse(localStorage.getItem('cart') || '') || [];
  
    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex((item: ICart) => item.productId === productId && item.sizeId === sizeId);
  
    if (existingItemIndex > -1) {
      // If item exists, update the quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // If item does not exist, add to cart
      cart.push(cartData);
    }
  
    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  