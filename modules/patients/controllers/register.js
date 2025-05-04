const patient = require("../../../models/login");

const bcrypt = require("bcrypt");
const jwttoken = require("jsonwebtoken");
const patientRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, age } = req.body;
    if (!firstName) throw "Firstname is required";
    if (!lastName) throw "Lastname is required";
    if (!email) throw "Email is required";
    if (!password) throw "Password is required";
    if (!gender) throw "Gender is required";
    if (!age) throw "Age is required";
    if (age < 0) throw "Age must be non negative";
    if (password.length < 5) throw "Password must contains atleast 5 letters";

    const user = await patient.findOne({ email: email });
    if (user) throw "Email already exists";
    const hashedPassword = await bcrypt.hash(password, 12);
    const save = await patient.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      gender: gender,
      age: age,
    });
    if (!save) throw "Error occured while saving data";

    const token = await jwttoken.sign(
      {
        _id: save._id,
        email: save.email,
      },
      process.env.JWTSECRETKEY
    );
    res
      .status(200)
      .json({
        Status: "Registered Successfully",
        accessToken: token,
        userId: save._id,
      });
  } catch (err) {
    res
      .status(500)
      .json({ Status: "Error occured", error: err.message ?? err });
  }
};

module.exports = patientRegister;
