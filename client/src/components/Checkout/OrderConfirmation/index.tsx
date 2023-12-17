import React from "react";
import { useStore } from "../../../store";
import Checked from "../../../assets/images/checked.svg";
import "./OrderConfirmation.scss";
const OrderConfirmation = () => {
  const { state } = useStore();
  const { cartItems } = state;
  const deliveryCharges = 100;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const salesTax = itemsPrice * 0.13;
  const totalPrice = itemsPrice + deliveryCharges + salesTax;
  return (
    <div className="order-confirmation">
      <div className="success-msg">
        <div>
          <img src={Checked} alt="checked" />
        </div>
        <div>
          <h4>Order Confirmed!</h4>
        </div>
        <div>
          <p>
            Your Payment was successful, you will receive a confirmation email
            soon
          </p>
        </div>
      </div>
      <div className="order-summary">
        <div className="row">
          <div className="col-6">
            <h5 className="heading">Order Summary</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-start">{`Sub Totals (${cartItems?.length} items)`}</div>
          <div className="col-6 text-end">{`$${itemsPrice}`}</div>
        </div>
        <div className="row">
          <div className="col-6">{`Sales Tax (13%)`}</div>
          <div className="col-6 text-end">{`$${salesTax}`}</div>
        </div>
        <div className="row">
          <div className="col-6">{`Delivery Fees`}</div>
          <div className="col-6 text-end">{`$${deliveryCharges}`}</div>
        </div>
        <div className="row">
          <div className="col-6 total">{`Total`}</div>
          <div className="col-6 total text-end">{`$${totalPrice}`}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
