const Customer = require("../models/customer");
const TempCustomerCode = require("../models/tempcustomercode");
const sendEmail = require("../utils/emailService");
exports.createOrUpdateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      streetAddress,
      city,
      state,
      zipCode,
      country,
    } = req.body;
    const existingCustomer = await Customer.findOne({
      where: { email: email },
    });
    const custObj = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      streetAddress: streetAddress,
      city: city,
      state: state,
      zipCode: zipCode,
      country: country,
    };
    if (!!existingCustomer) {
      const customer = await existingCustomer.update(custObj);
      return res.status(200).json({
        customer: customer,
        message: "Customer updated successfully!!",
      });
    } else {
      const customer = await Customer.create({ custObj, email: email });
      return res.status(201).json({
        customer: customer,
        message: "Customer created successfully!!",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.sendOtp = async (req, res) => {
    try {
      const { email } = req.body;
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      const user = await TempCustomerCode.findOne({ where: { email: email } });
      
      const isEmailSent = await sendEmail(
        email,
        `Shoe Mate Email Verification`,
        `<div style="margin: 50px; width: 70%; border: 1px solid black; padding: 20px; border-radius: 10px;
    "> <h3>Verify your email address</h3>
        <p>Thanks for registering on Shoe Mate. We want to make sure it's really you. Please enter the following verification code when prompted. If you don’t want to create an account, you can ignore this message.</p>
        <div style="
        width: 100%;">
        <h4 style="text-align: center;margin: 5px;">Verification Code</h4>
        <p style="text-align: center;margin: 5px;">${verificationCode}</p>
        <div>
        </div>`
      );
      if (isEmailSent) {
        user ? 
          await user.update({ email, code: verificationCode }): 
          await TempCustomerCode.create({ email, code: verificationCode });
        res.status(201).json({message: "Code sent successfully"});
      } else {
        res.status(400).json({ error: "something went wrong" });
      }
    } catch (error) {
      console.log("=====", error)
      res.status(400).json({ error: error.message });
    }
  };
  
  
  exports.verifyOtp = async (req, res) => {
    try {
      const { email, code } = req.body;
      const user = await TempCustomerCode.findOne({ where: { email: email } });
      if (user.dataValues.code === code) {
        await this.createOrUpdateUser(req, res)
      }
      else {
        return res.status(201).json({ "message": "OTP Mismatched" });
      }
    } catch (error) {
      console.log("=====", error)
      res.status(400).json({ error: error.message });
    }
  };