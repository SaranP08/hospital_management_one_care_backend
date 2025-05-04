const mongoose = require("mongoose");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      age,
      specializedIn,
      fee,
    } = req.body;
    if (!firstName) throw "Firstname is required";
    if (!lastName) throw "Lastname is required";
    if (!email) throw "Email is required";
    if (!password) throw "Password is required";
    if (!gender) throw "Gender is required";
    if (!age) throw "Age is required";
    if (age < 0) throw "Age must be non negative";
    if (password.length < 5) throw "Password must contains atleast 5 letters";
    if (!fee) throw "Fee is required";
    if (fee < 0) throw "Fee must be non negative";

    const user = mongoose.model("doctorUser");
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await user.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      gender: gender,
      age: age,
      specializedIn: specializedIn,
      generalFee: fee,
    });
    if (!user) throw "Error occured while saving data";
    console.log(newUser);
    const webToken = await jwtToken.sign(
      {
        _id: newUser._id,
        email: newUser.email,
      },
      process.env.JWTSECRETKEY
    );
    res.status(200).json({ status: "registered", accessToken: webToken });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
module.exports = register;
