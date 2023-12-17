import React from "react";
import { ICart } from "../../../interfaces";
import { useStore } from "../../../store";

const OrderSummary = () => {
  const { state } = useStore();
  const { cartItems } = state;
  const deliveryCharges = 100;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const salesTax = itemsPrice * 0.13;
  const totalPrice = itemsPrice + deliveryCharges + salesTax;
  return (
    <div className="order-summary">
      <div className="row main-heading">
        <h3 className="col-8 d-flex">Order</h3>
        <span className="col-4 edit-btn">Edit</span>
      </div>
      <div className="">
        {/* <button onClick={}>Proceed to </button> */}
        <div className="row amount-container">
          <span className="col-8 d-flex">
            {`${cartItems.length} items price`}:
          </span>
          <span className="col-4 d-flex justify-content-end">
            ${itemsPrice.toFixed(2)}
          </span>
        </div>
        <div className="row amount-container">
          <span className="col-8 d-flex">Delivery Charges:</span>
          <span className="col-4 d-flex justify-content-end">
            ${deliveryCharges.toFixed(2)}
          </span>
        </div>
        <div className="row amount-container">
          <span className="col-8 d-flex">Sales Tax:</span>
          <span className="col-4 d-flex justify-content-end">
            ${salesTax.toFixed(2)}
          </span>
        </div>
        <div className="row total-container">
          <span className="col-8 d-flex">Total Price:</span>
          <span className="col-4 d-flex justify-content-end">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="cart-items">
        {cartItems.map((item: ICart) => (
          <div key={item.productId} className=" cart-item d-flex">
            <div className="prod-img">
              <img src={item?.thumbnail} alt="product-img" />
            </div>
            <div className="prod-detail">
              <h4>{item.name}</h4>
              <span>Price per unit: ${Number(item.price).toFixed(0)}</span>
              <span>Color: {item?.color}</span>
              <span>Size: {item?.sizeLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
