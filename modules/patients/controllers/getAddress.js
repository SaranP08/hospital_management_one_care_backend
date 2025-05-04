const mongoose = require("mongoose");
const patient = require("../../../models/login");

const getAddress = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) throw new Error("User id is required");
    const address = await patient.findOne({ _id: userId }).select("address");
    console.log(address);
    if (!address) throw new Error("User/Address not found");

    res.status(200).json(address);
  } catch (err) {
    res.status(500).json({ error: err.message ?? err });
  }
};

module.exports = getAddress;
