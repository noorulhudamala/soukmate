import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Payment.scss";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { IOrderPayment, IPayment } from "../../../interfaces";
const stripePromise = loadStripe("your_publishable_key");
type PaymentProps = {
  setOrderPayment: Function;
  orderPayment: IOrderPayment
}
const Payment = ({setOrderPayment, orderPayment}: PaymentProps) => {
  const [paymentDetails, setPaymentDetails] = useState<IPayment>({
    cardNumber: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const formatCardNumber = (input: string) => {
    return input.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (input: string) => {
    return input
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{0,2})/, "$1/$2")
      .substring(0, 5);
  };
  const handleOnInputChange = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "cardNumber":
        const formattedCardNumber = formatCardNumber(value);
        setPaymentDetails((prevState: IPayment) => ({
          ...prevState,
          cardNumber: formattedCardNumber,
        }));
        break;
      case "name":
        setPaymentDetails((prevState: IPayment) => ({
          ...prevState,
          name: value,
        }));
        break;
      case "expiry":
        const formattedExpiry = formatExpiry(value);
        setPaymentDetails((prevState: IPayment) => ({
          ...prevState,
          expiry: formattedExpiry,
        }));
        break;
      case "cvv":
        setPaymentDetails((prevState: IPayment) => ({
          ...prevState,
          cvv: value,
        }));
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Use the paymentMethod to complete the payment on the backend.
    // Send the payment information to your Node.js server.
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  return (
    <div className="payment">
      <Elements stripe={stripePromise}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <div className="sub-heading mb-4">
                  <h3 className="col-8 d-flex">Payment</h3>
                  <hr className="underline" />
                </div>
                <div>
                  <div className="row d-flex">
                    <div className="col-12">
                      <FormControl sx={{ m: 1, width: "100%" }} size="small">
                        <TextField
                          label="Card Number *"
                          id="outlined-size-small"
                          //   defaultValue="Small"
                          size="small"
                          value={paymentDetails?.cardNumber}
                          onChange={(e) =>
                            handleOnInputChange("cardNumber", e.target.value)
                          }
                          inputProps={{
                            maxLength: 19, // Maximum MM/YY length
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col-12 mb-2 ">
                      <FormControl sx={{ m: 1, width: "100%" }} size="small">
                        <TextField
                          label="Name on Card *"
                          id="outlined-size-small"
                          size="small"
                          value={paymentDetails?.name}
                          onChange={(e) =>
                            handleOnInputChange("name", e.target.value)
                          }
                          inputProps={{
                            maxLength: 100, // Maximum MM/YY length
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="row d-flex">
                    <div className="col-6 mb-2 ">
                      <FormControl sx={{ m: 1, width: "100%" }} size="small">
                        <TextField
                          label="Expiry Month *"
                          id="outlined-size-small"
                          //   defaultValue="Small"
                          value={paymentDetails?.expiry}
                          onChange={(e) =>
                            handleOnInputChange("expiry", e.target.value)
                          }
                          size="small"
                        />
                      </FormControl>
                    </div>
                    <div className="col-6">
                      <FormControl sx={{ m: 1, width: "100%" }} size="small">
                        <TextField
                          label="CVV *"
                          id="outlined-size-small"
                          value={paymentDetails?.cvv}
                          type={"password"}
                          onChange={(e) =>
                            handleOnInputChange("cvv", e.target.value)
                          }
                          size="small"
                          inputProps={{
                            maxLength: 3, // Maximum MM/YY length
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Elements>
    </div>
  );
};

export default Payment;
