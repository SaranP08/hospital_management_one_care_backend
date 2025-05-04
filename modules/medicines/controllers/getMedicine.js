const medicines = require("../../../models/medicines");

const getMedicineName = async (req, res) => {
  const medId = req.params.id;
  if (!medId) throw new Error("Medicine id is required");
  const medicine = await medicines.findOne({ _id: medId }).select("name");
  if (!medicine) throw new Error("Enter valid medicineId");
  res.status(200).json(medicine);
};
module.exports = getMedicineName;
