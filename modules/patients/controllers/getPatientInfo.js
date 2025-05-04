const patient = require("../../../models/login");
const getPatientInfo = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) throw new Error("User id is required");

    const getPatient = await patient
      .findOne({ _id: userId })
      .select("-password");
    if (!getPatient) throw new Error("Patient Not found");
    res.status(200).json({ patientInfo: getPatient });
  } catch (err) {
    res.status(500).json({ Error: err.message ?? err });
  }
};

module.exports = getPatientInfo;
