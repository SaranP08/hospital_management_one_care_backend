const user = require("../../../models/doctorRegister");
const patient = require("../../../models/login");
const patientUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const user1 = await user.findById(id);
    if (!user1) throw "Doctor not found";

    const pId = req.body.patientDetails.patientId;
    const slot = req.body.patientDetails.slot;
    const update = await user.findByIdAndUpdate(
      id,
      { $push: { patientDetails: { patientId: pId, slot: slot } } },
      { new: true }
    );

    const update2 = await patient.findByIdAndUpdate(pId, {
      $push: {
        doctorDetails: {
          id: id,
          slot: slot,
        },
      },
    });
    if (!update) {
      res.status(404).json({ err: "User not found" });
      return;
    }
    if (!update2) {
      res.status(404).json({ err: "User 2 not found" });
      return;
    }

    res.status(400).json({ Status: "Success" });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
module.exports = patientUpdate;
