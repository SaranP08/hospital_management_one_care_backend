const patient = require("../../../models/login");
const patientGroupInfo = async (req, res) => {
  try {
    const patientInfo = await patient.find({
      _id: { $in: req.body.patientIds },
    });

    if (patientInfo) {
      res.status(400).json(patientInfo);
    } else {
      res.status(404).json({ info: "No user found" });
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
module.exports = patientGroupInfo;
