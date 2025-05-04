const doctor = require("../../../models/doctorRegister");

const getSpecializations = async (req, res) => {
  const uniqueSpecializations = await doctor.distinct("specializedIn");
  if (!uniqueSpecializations) throw new Error("No doctor found");
  res.status(200).json({ specializations: uniqueSpecializations });
};

module.exports = getSpecializations;
