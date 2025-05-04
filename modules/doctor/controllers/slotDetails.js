const express = require("express");
const mongoose = require("mongoose");
const slotDetails = async (req, res) => {
  try {
    const user = mongoose.model("doctorUser");
    const slots = await user
      .findById(req.params.id)
      .select("patientDetails.slot");
    if (slots) {
      res.status(400).json(slots);
    } else {
      res.status(404).json({ info: "No patient found" });
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

module.exports = slotDetails;
