const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const jwtToken = require("jsonwebtoken");
const doctorLogin = async (req, res) => {
  try {
    const user = mongoose.model("doctorUser");
    const { email, password } = req.body;
    const details = await user.findOne({ email });
    if (!details) throw "Email doesn't exist";
    console.log(details);
    const comparePassword = await bcrypt.compare(password, details.password);
    if (!comparePassword) throw "Password doesn't match";
    const webToken = await jwtToken.sign(
      {
        _id: details._id,
        email: details.email,
      },
      process.env.JWTSECRETKEY
    );
    res.status(200).json({
      status: "Success",
      accessToken: webToken,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = doctorLogin;
