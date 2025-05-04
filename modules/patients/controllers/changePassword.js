const patient = require("../../../models/login");
const bcrypt = require("bcrypt");
const jwttoken = require("jsonwebtoken");
const changePassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (!password) throw new Error("Password field is required");
  if (!confirmPassword) throw new Error("Confirm password field is required");
  if (!email) throw new Error("Email is required");
  if (password.length < 5)
    throw new Error("Password contains atleast 5 letters");
  if (password != confirmPassword)
    throw new Error("Password and confirm password is not same");

  const findUser = await patient.findOne({ email: email });
  if (!findUser) throw new Error("User not found");
  if (findUser.resetCode.isVerified == false)
    throw new Error("Otp is not yet verified");
  const hashedPassword = await bcrypt.hash(password, 12);
  if (!hashedPassword) throw new Error("Bcrypt error");
  const updatePatient = await patient.updateOne(
    { email: email },
    { password: hashedPassword, resetCode: { otp: 0, isVerified: false } }
  );
  if (!updatePatient) throw new Error("Error occured while updating");
  const token = await jwttoken.sign(
    {
      _id: findUser._id,
      email: findUser.email,
    },
    process.env.JWTSECRETKEY
  );
  res
    .status(200)
    .json({ status: "Updated", accessToken: token, userId: findUser._id });
};
module.exports = changePassword;
