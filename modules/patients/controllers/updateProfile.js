const patient = require("../../../models/login");
const updateProfile = async (req, res) => {
  try {
    const updateField = req.body;
    const userId = req.params.userId;
    if (!updateField) throw new Error("Body is required");

    const updatePatient = await patient.findOneAndUpdate(
      { _id: userId },
      updateField,
      { new: true }
    );
    if (!updatePatient) throw new Error("patient not found");

    res.status(200).json({ status: "Updated" });
  } catch (err) {
    res.status(500).json({ Error: err.message ?? err });
  }
};

module.exports = updateProfile;
