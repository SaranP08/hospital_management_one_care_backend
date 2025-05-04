const doctor = require("../../../models/doctorRegister");
const getDoctorDetails = async (req, res) => {
  const specializedIn = req.params.specializedIn;
  if (!specializedIn) throw new Error("SpecializedIn field is required");

  const getDoctors = await doctor
    .find({
      specializedIn: new RegExp(`^${specializedIn}$`, "i"),
    })
    .select("firstName specializedIn generalFee");
  if (!getDoctors) {
    res.status(500).json({ error: "Error occured" });
  }
  res.status(200).json(getDoctors);
};

module.exports = getDoctorDetails;
