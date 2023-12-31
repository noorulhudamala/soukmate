import React, { useEffect, useState } from "react";
import { IOrderPayment } from "../../interfaces";
import { useStore } from "../../store";
import { ADD_TO_CART } from "../../store/actions";
import "./Checkout.scss";
import CheckoutStepper from "./CheckoutStepper";
import Details from "./Details";
import Payment from "./Payment";
import OrderConfirmation from "./OrderConfirmation";

const Checkout = () => {
  const { state, dispatch } = useStore();
  const { cartItems, showCart } = state;
  const [activeStep, setActiveStep] = React.useState(0);
  const deliveryCharges = 100;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const salesTax = itemsPrice * 0.13;
  const totalPrice = itemsPrice + deliveryCharges + salesTax;
  const steps = ["Delivery Information", "Payment", "Confirmation"];
  const [orderPayment, setOrderPayment] = useState<IOrderPayment>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    deliveryNotes: "", 
    cardNumber: "",
    country: ""
  });
  useEffect(() => {
    const cart = [
      {
        id: "ce087512-d3c5-4617-a3a9-72af8c2755cc",
        productId: 1,
        name: "Five Ten Kestrel Lace Mountain Bike Shoes",
        color: "Grey",
        sizeId: 11,
        sizeLabel: "10",
        quantity: 1,
        maxQuantity: 50,
        price: "150.00",
        thumbnail:
          "https://assets.adidas.com/images/w_600,f_auto,q_auto/2b04943c525e4909a7a5a9fa0116153d_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_01_standard.jpg",
      },
      {
        id: "ce087512-d3c5-4617-a3a9-72af8c2755cc",
        productId: 1,
        name: "Five Ten Kestrel Lace Mountain Bike Shoes",
        color: "Grey",
        sizeId: 11,
        sizeLabel: "10",
        quantity: 1,
        maxQuantity: 50,
        price: "150.00",
        thumbnail:
          "https://assets.adidas.com/images/w_600,f_auto,q_auto/2b04943c525e4909a7a5a9fa0116153d_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_01_standard.jpg",
      },
      {
        id: "ce087512-d3c5-4617-a3a9-72af8c2755cc",
        productId: 1,
        name: "Five Ten Kestrel Lace Mountain Bike Shoes",
        color: "Grey",
        sizeId: 11,
        sizeLabel: "10",
        quantity: 1,
        maxQuantity: 50,
        price: "150.00",
        thumbnail:
          "https://assets.adidas.com/images/w_600,f_auto,q_auto/2b04943c525e4909a7a5a9fa0116153d_9366/Five_Ten_Kestrel_Lace_Mountain_Bike_Shoes_Grey_BC0770_01_standard.jpg",
      },
    ];
    dispatch({ type: ADD_TO_CART, payload: cart });
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  return (
    <div className="checkout">
      <div className={` w-100 ${showCart ? "show-cart" : ""}`}>
          <div className="main-heading">
            <h2>Checkout</h2>
            {activeStep < 1 ? <h6>
              Items in your bag are not reserved — check out now to make them
              yours.
            </h6> : null}
          </div>
          <CheckoutStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
          />

          {activeStep === 0 && <Details setOrderPayment={setOrderPayment} orderPayment={orderPayment} />}
          {activeStep === 1 && <Payment setOrderPayment={setOrderPayment} orderPayment={orderPayment} />}
          {activeStep === 2 && <OrderConfirmation />}

          {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box> */}
      </div>
    </div>
  );
};

export default Checkout;
