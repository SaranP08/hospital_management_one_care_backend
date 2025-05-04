const patient = require("../../../models/login");
const bcrypt = require("bcrypt");
const webToken = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    if (!email) throw "Email is required";
    if (!password) throw "Password is required";
    const user = await patient.findOne({ email: email });
    console.log(user);
    if (!user) throw "Please enter valid email address";
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) throw new Error("Email and password doesn't match");

    const token = await webToken.sign(
      { _id: user._id, email: user.email },
      process.env.JWTSECRETKEY
    );
    res
      .status(200)
      .json({ status: "Success", accessToken: token, userId: user.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Failure", error: err.message ?? err });
  }
};
module.exports = login;
