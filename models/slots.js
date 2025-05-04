const mongoose = require("mongoose");
const slotSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    default: null,
  },
});

const dailyScheduleSchema = new mongoose.Schema({
  date: { required: true, type: Date, unique: true },
  slotSchedule: [slotSchema],
});
const slots = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctorUser",
    required: true,
  },

  schedule: [dailyScheduleSchema],
});

module.exports = mongoose.model("Slots", slots);
