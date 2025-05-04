const nodemailer = require("nodemailer");
const sendMail = async (to, subject, text) => {
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abhinivi67@gmail.com", // your Gmail account
      pass: "kxtl dmhb dgsb dsfg", // your Gmail account password or App Password
    },
    logger: true, // Enable logging
    debug: true, // Enable debugging
  });
  let mailOptions = {
    from: "abhinivi67@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
module.exports = sendMail;
