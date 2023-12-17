import React, { ChangeEvent, useState } from "react";
import * as Yup from "yup";
import "./Details.scss";
import FormControl from "@mui/material/FormControl";
import OrderSummary from "../OrderSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ICustomer, IOrderPayment, IRadioOptions } from "../../../interfaces";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../Shared/Input";
import RadioInput from "../../Shared/RadioInput";
import { sendOtp, updateCustomer, verifyOtp } from "../../../api/customerApi";
import { useStore } from "../../../store";
import { IS_USER_VERIFIED } from "../../../store/actions";
import Loader from "../../Shared/Loader";
type DetailsProps = {
  setOrderPayment: Function;
  orderPayment: IOrderPayment;
};
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phone: Yup.string().required("Phone is required"),
  streetAddress: Yup.string().required("Street Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string().required("Zip Code is required"),
  country: Yup.string().required("Country is required"),
  paymentMethod: Yup.string().required("Please select one"),
});
const paymentMethodOptions: IRadioOptions[] = [
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
    mode: "onChange",
  });
  const {
    handleSubmit: onEmailVerify,
    control: emailControl,
    formState: { errors: emailError },
    setValue: setEmailValue
  } = useForm<any>({
    resolver: yupResolver(emailValidationSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });
  const {
    handleSubmit: onCodeVerify,
    control: codeControl,
    formState: { errors: codeError },
    setValue: setCodeValue
  } = useForm<any>({
    resolver: yupResolver(codeValidationSchema),
    mode: "onChange",
  });

  const [showEmail, setShowEmail] = useState<boolean>(true);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [isShowLoader, setIsShowLoader] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [disableFields, setDisableFields] = useState<boolean>(true);
  const { dispatch, state } = useStore();
  const isUserVerified = state.isUserVerified;

  const onHandleEmailSubmit = async (data: string) => {
    setIsShowLoader(true)
    await sendOtp(orderPayment?.email);
    setIsShowLoader(false)
    setShowEmail(false)
    setShowCode(true)
  };
  const onHandleCodeSubmit = async(data: string) => {
    setShowCode(false)
    setDisableFields(false)
    const custData = await verifyOtp(orderPayment?.email, code);
    if (custData) {
      setOrderPayment(custData?.customer)
    }
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
      case "firstName": 
      case "lastName": 
      case "streetAddress": 
      case "city": 
      case "state": 
      case "zipCode":
      case "country":
      case "phone":
        setOrderPayment((prevState:IOrderPayment)=> ({...prevState, [name]: value}))
        setValue(name, value);
        break;
      default:
        break;
    }
  }
  const onSubmit = async(data: any) => {
    // Handle form submission
    console.log(data);
    const custObj = Object.entries(data);
    for (let i = 0; i < custObj.length; i++){
      setValue(custObj[i][0], custObj[i][1]);
    }
    const customerObj: ICustomer = {
      firstName: orderPayment?.firstName,
      lastName: orderPayment?.lastName,
      email: orderPayment?.email,
      phone: orderPayment?.phone,
      streetAddress: orderPayment?.streetAddress,
      city: orderPayment?.city,
      state: orderPayment?.state,
      zipCode: orderPayment?.zipCode,
      country: orderPayment?.country
    }
    await updateCustomer(customerObj);
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
      {isShowLoader && <Loader open={isShowLoader} setOpen={setIsShowLoader} />} 
      <div className="col-6 address-details">
        <div className="mb-4">
          <div className="sub-heading">
            <h3 className="col-8 d-flex">Delivery Information</h3>
            <hr className="underline" />
          </div>
          <div>
            {showEmail ? <div className="row w-100 d-flex">
              <div className="col-8 mb-2 ">
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
              <div className="col-8 mb-2 ">
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
                      id="firstName"
                      name="firstName"
                      control={control}
                      error={errors.firstName?.message || ""}
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
                      id="lastName"
                      name="lastName"
                      control={control}
                      error={errors.lastName?.message || ""}
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
                      id="streetAddress"
                      name="streetAddress"
                      control={control}
                      error={errors.streetAddress?.message || ""}
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
                <div className="col-3">
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
                <div className="col-3">
                  <FormControl sx={{ m: 1, width: "100%" }} size="small">
                    <Input
                      label="Zip Code*"
                      id="zipCode"
                      name="zipCode"
                      control={control}
                      error={errors.zipCode?.message || ""}
                      onChange={onInputChangeHandler}
                      value={orderPayment?.zipCode}
                      disabled={disableFields}
                    />
                  </FormControl>
                </div>
              </div>
              <div className="row d-flex">
                <div className="col-6">
                  <FormControl sx={{ m: 1, width: "100%" }} size="small">
                    <Input
                      label="Country*"
                      id="country"
                      name="country"
                      control={control}
                      error={errors.country?.message || ""}
                      onChange={onInputChangeHandler}
                      value={orderPayment?.country}
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
                      value={orderPayment?.phone}
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
                      name="paymentMethod"
                      control={control}
                      error={errors?.paymentMethod?.message}
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
