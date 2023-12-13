const TempCustomerCode = require("../models/tempcustomercode");
const sendEmail = require("../utils/emailService");
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const user = await TempCustomerCode.findOne({ where: { email: email } });
    
    const isEmailSent = await sendEmail(
      email,
      `Shoe Mate Email Verification`,
      `<div style="margin: 50px; width: 50%; border: 1px solid black; padding: 20px; border-radius: 10px;
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
      return res.status(201).json({ "message": "User verified successfully" });
    }
    else {
      return res.status(201).json({ "message": "OTP Mismatched" });
    }
  } catch (error) {
    console.log("=====", error)
    res.status(400).json({ error: error.message });
  }
};