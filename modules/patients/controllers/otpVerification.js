const patient = require("../../../models/login");
const otpVerification = async (req, res) => {
  const { email, otp } = req.body;
  const findUser = await patient.findOne({ email: email });
  if (!findUser) throw new Error("No user found");

  if (otp == findUser.resetCode.otp) {
    const updatePatient = await patient.updateOne(
      { email: email },
      { resetCode: { ...findUser.resetCode, isVerified: true } }
    );
    if (!updatePatient) throw new Error("Error occured");
    res.status(200).json({ status: "Success", isVerified: true });
    return;
  }
  res.status(500).json({ error: "Please Enter valid OTP" });
};
module.exports = otpVerification;
