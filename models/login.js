const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  doctorDetails: [
    {
      id: mongoose.Schema.Types.ObjectId,
      slot: String,
    },
  ],
  resetCode: {
    otp: Number,
    isVerified: Boolean,
  },
  address: [
    {
      name: String,
      houseNo: Number,
      landmark: String,
      street: String,
      city: String,
      state: String,
      phone: String,
      pincode: Number,
    },
  ],
});

module.exports = mongoose.model("Patient", userSchema);
