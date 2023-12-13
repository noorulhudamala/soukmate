const nodemailer = require("nodemailer");

const createTranspoter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN
    }
  });
}

module.exports = sendEmail = async(to, subject, content) => {
    const transporter = createTranspoter()
  let mailOptions = {
    from: {
      name: 'Shoe Mate',
      address: process.env.SENDER_EMAIL
    },
    to: `${to}`,
    subject: subject,
    html: content
  }
  try {
      const t = await transporter.sendMail(mailOptions) 
      return true;
    }
    catch (err) {
       console.log("=====", err);
      return false;
    }
}