const sendMail = require("./sendMail");
const patient = require("../../../models/login");

const resetCode = async (req, res) => {
  const { to } = req.body;
  const subject = "OTP Verification Code";
  const findUser = await patient.findOne({ email: to });
  if (!findUser) throw new Error("Email address doesn't exist");
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const text = "Hello user, Your OTP Verification code is " + randomNum;
  const isSent = await sendMail(to, subject, text);

  const updatePatient = await patient.updateOne(
    { email: to },
    { resetCode: { otp: randomNum, isVerified: false } }
  );

  if (!isSent || !updatePatient) {
    res.status(500).json({ err: "Error" });
  }
  res.status(200).json({ status: "sent", isSent: true });
};
module.exports = resetCode;
