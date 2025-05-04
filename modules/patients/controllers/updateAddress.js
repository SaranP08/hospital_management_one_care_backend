const patient = require("../../../models/login");
const updateAddress = async (req, res) => {
  const { userId, addressId } = req.params;
  if (!userId) throw new Error("User id is required");
  if (!addressId) throw new Error("Address id is required");
  const updateFields = req.body;

  const findPatient = await patient.findOne({ _id: userId });
  if (!findPatient) throw new Error("Patient is not found");
  const updateAddress = await patient.findOneAndUpdate(
    { _id: userId, "address._id": addressId },
    { $set: { "address.$": updateFields } },
    { new: true, runValidators: true }
  );
  if (!updateAddress) throw new Error("Error occured while updating");
  res.status(200).json({ status: "Success", isUpdated: true });
};

module.exports = updateAddress;
