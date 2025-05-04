const patient = require("../../../models/login");

const deletePatient = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) throw new Error("User id is required");
    const findPatient = await patient.findOne({ _id: userId });
    if (!findPatient) throw new Error("Patient not found");

    const deletePatient = await patient.deleteOne({ _id: userId });
    if (!deletePatient) throw new Error("Error occured while deleting");

    res.status(200).json({ Status: "Deleted" });
  } catch (err) {
    res.status(500).json({ Error: err.message ?? err });
  }
};

module.exports = deletePatient;
