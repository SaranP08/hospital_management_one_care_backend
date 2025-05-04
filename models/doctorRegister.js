const mongoose = require("mongoose");

const doctorUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  specializedIn: {
    type: String,
    required: true,
  },
  generalFee: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("doctorUser", doctorUserSchema);
