const doctor = require("../../../models/doctorRegister");
const getSpecificDetail = async (req, res) => {
  const doctorId = req.params.id;
  if (!doctorId) throw new Error("Doctor id is required");

  const getDoctor = await doctor
    .findOne({ _id: doctorId })
    .select("firstName gender specializedIn generalFee");
  if (!getDoctor) throw new Error("Enter valid doctor id");
  res.status(200).json(getDoctor);
};
module.exports = getSpecificDetail;
