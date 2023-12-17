import React, { ChangeEvent, useState } from "react";
import * as Yup from "yup";
import "./Details.scss";
import FormControl from "@mui/material/FormControl";

import Divider from "@mui/material/Divider";
import OrderSummary from "../OrderSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { IOrderPayment, RadioOptions } from "../../../interfaces";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../Shared/Input";
import RadioInput from "../../Shared/RadioInput";
import { sendOtp, verifyOtp } from "../../../api/customerApi";
import { useStore } from "../../../store";
import { IS_USER_VERIFIED } from "../../../store/actions";
type DetailsProps = {
  setOrderPayment: Function;
  orderPayment: IOrderPayment;
};
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  phone: Yup.string().required("Phone is required"),
  street_address: Yup.string().required("Street Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip_code: Yup.string().required("Zip Code is required"),
  payment_method: Yup.string().required("Please select one"),
});
const paymentMethodOptions: RadioOptions[] = [
  {
    label: "Visa",
    value: "card",
  },
  {
    label: "Cash On Delivery",
    value: "COD",
  },
  {
    label: "POS on Delivery",
    value: "POS on Delivery",
  },
];
const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
});
const codeValidationSchema = Yup.object().shape({
  code: Yup.string().required("Code is required").min(6).required('Please enter a value'),
});
const Details = ({ orderPayment, setOrderPayment }: DetailsProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    mode: "onBlur",
  });
  const {
    handleSubmit: onEmailVerify,
    control: emailControl,
    formState: { errors: emailError },
    setValue: setEmailValue
  } = useForm<any>({
    resolver: yupResolver(emailValidationSchema),
    reValidateMode: "onChange",
    mode: "onBlur",
  });
  const {
    handleSubmit: onCodeVerify,
    control: codeControl,
    formState: { errors: codeError },
    setValue: setCodeValue
  } = useForm<any>({
    resolver: yupResolver(codeValidationSchema),
    mode: "onBlur",
  });

  const [showEmail, setShowEmail] = useState<boolean>(true);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [disableFields, setDisableFields] = useState<boolean>(true);
  const { dispatch, state } = useStore();
  const isUserVerified = state.isUserVerified;

  const onHandleEmailSubmit = async (data: string) => {
    setShowEmail(false)
    setShowCode(true)
    await sendOtp(orderPayment?.email);
  };
  const onHandleCodeSubmit = async(data: string) => {
    setShowCode(false)
    setDisableFields(false)
    await verifyOtp(orderPayment?.email, code);
    dispatch({ type: IS_USER_VERIFIED, payload: true });
  };

  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    
    switch (name) {
      case "code":
        setCode(value);
        setCodeValue(name, value)
        break;
      case "email":
        setOrderPayment((prevState:IOrderPayment)=> ({...prevState, email: value}))
        setEmailValue(name, value)
        break;
      case "first_name": 
      case "last_name": 
      case "street_address": 
      case "city": 
      case "state": 
      case "zip_code":
        setValue(name, value);
        break;
      default:
        break;
    }
  }
  const onSubmit = (data: any) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <Box
      className="details"
      sx={{
        display: "flex",
        "& hr": {
          mx: 0.5,
        },
      }}
    >
      <div className="col-6 address-details">
        <div className="mb-4">
          <div className="sub-heading">
            <h3 className="col-8 d-flex">Delivery Information</h3>
            <hr className="underline" />
          </div>
          <div>
            {showEmail ? <div className="row w-100 d-flex">
              <div className="col-7 mb-2 ">
                <FormControl sx={{ m: 1, width: "100%" }} size="small">
                  <Input
                    label="Email*"
                    id="email"
                    name="email"
                    control={emailControl}
                    error={emailError.email?.message || ""}
                    maxLength={50}
                    value={orderPayment?.email}
                    onChange={onInputChangeHandler}
                  />
                </FormControl>
              </div>
              <div className="col-3">
                <FormControl sx={{ m: 1, width: "100%" }} size="small">
                  <Button
                    variant="contained"
                    onClick={onEmailVerify(onHandleEmailSubmit)}
                  >
                    Send Code
                  </Button>
                </FormControl>
              </div>
            </div> : null}
            {showCode ? <div className="row d-flex">
              <div className="col-7 mb-2 ">
                <FormControl sx={{ m: 1, width: "100%" }} size="small">
                  <Input
                    label="Code*"
                    id="code"
                    name="code"
                    control={codeControl}
                    error={codeError.code?.message || ""}
                    maxLength={6}
                    value={code}
                    onChange={onInputChangeHandler}
                  />
                </FormControl>
              </div>
              <div className="col-3">
                <FormControl sx={{ m: 1, width: "100%" }} size="small">
                  <Button
                    variant="contained"
                    onClick={onCodeVerify(onHandleCodeSubmit)}
                  >
                    Verify Code
                  </Button>
                </FormControl>
              </div>
            </div> : null}
            {isUserVerified ? <div className="row d-flex">
              <div className="col-7 mx-3 mb-3 ">
                <p className="text-start">{ orderPayment?.email}</p>
              </div>
            </div> : null}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row d-flex">
                <div className="col-6 mb-2 ">
                  <FormControl sx={{ m: 1, width: "100%" }} size="small">
                    <Input
                      label="First Name*"
                      id="first_name"
                      name="first_name"
                      control={control}
                      error={errors.first_name?.message || ""}
                      onChange={onInputChangeHandler}
                      value={orderPayment?.firstName}
                      disabled={disableFields}
                    />
                  </FormControl>
                </div>
                <div className="col-6">
                  <FormControl sx={{ m: 1, width: "100%" }} size="small">
                    <Input
                      label="Last Name*"
                      id="last_name"
                      name="last_name"
                      control={control}
                      error={errors.last_name?.message || ""}
                      onChange={onInputChangeHandler}
                      value={orderPayment?.lastName}
                      disabled={disableFields}
                    />
                  </FormControl>
                </div>
              </div>
              <div className="row d-flex"></div>
              <div className="row d-flex">
                <div className="col-12">
                  <FormControl sx={{ m: 1, width: "100%" }} size="small">
                    <Input
                      label="Street Address*"
                      id="street_address"
                      name="street_address"
                      control={control}
                      error={errors.street_address?.message || ""}
                      onChange={onInputChangeHandler}
                      value={orderPayment?.streetAddress}
                      disabled={disableFields}
                    />
                  </FormControl>
                </div>
              </div>
              <div className="row d-flex">
                <div className="col-6 mb-2 ">
                  <FormControl sx={{ m: 1, width: "100%" }} size="small">
                    <Input
                      label="City*"
                      id="city"
                      name="city"
                      control={control}
                      error={errors.city?.message || ""}
                      onChange={onInputChangeHandler}
                      value={orderPayment?.city}
                      disabled={disableFields}
                    />
                  </FormControl>
                </div>
                <div className="col-6">
                  <FormControl sx={{ m: 1, width: "100%" }} size="small">
                    <Input
                      label="State*"
                      id="state"
                      name="state"
                      control={control}
                      error={errors.state?.message || ""}
                      onChange={onInputChangeHandler}
                      value={orderPayment?.state}
                      disabled={disableFields}
                    />
                  </FormControl>
                </div>
                
              </div>
              <div className="row d-flex">
              <div className="col-6">
                  <FormControl sx={{ m: 1, width: "100%" }} size="small">
                    <Input
                      label="Zip Code*"
                      id="zip_code"
                      name="zip_code"
                      control={control}
                      error={errors.zip_code?.message || ""}
                      onChange={onInputChangeHandler}
                      value={orderPayment?.zipCode}
                      disabled={disableFields}
                    />
                  </FormControl>
                </div>
                <div className="col-6">
                  <FormControl sx={{ m: 1, width: "100%" }} size="small">
                    <Input
                      label="Phone*"
                      id="phone"
                      name="phone"
                      control={control}
                      error={errors.phone?.message || ""}
                      onChange={onInputChangeHandler}
                      value={orderPayment?.phoneNo}
                      disabled={disableFields}
                    />
                  </FormControl>
                </div>
              </div>
              <div className="row d-flex">
                <div className="col-12">
                  <FormControl sx={{ m: 1, width: "100%" }} size="small">
                    <Input
                      label="Delivery Notes*"
                      id="delivery_notes"
                      name="delivery_notes"
                      control={control}
                      onChange={onInputChangeHandler}
                      value={orderPayment?.deliveryNotes}
                      disabled={disableFields}
                    />
                  </FormControl>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <FormControl className="w-100 d-table mx-3">
                    <RadioInput
                      label="Payment Method"
                      id="payment-method"
                      name="payment_method"
                      control={control}
                      error={errors?.payment_method?.message}
                      options={paymentMethodOptions}
                      disabled={disableFields}
                    />
                  </FormControl>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-6"></div>
                <div className="col-6">
                  <FormControl sx={{mt: 2,  width: "100%", float: "right" }} size="small">
                    <Button
                      variant="contained"
                      type="submit"
                    >
                      Continue to Payment
                    </Button>
                  </FormControl>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-3">
        <OrderSummary />
      </div>
    </Box>
  );
};

export default Details;
