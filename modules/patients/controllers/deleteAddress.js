const patient = require("../../../models/login");
const deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;
  if (!userId) throw new Error("User id is required");
  if (!addressId) throw new Error("Address id is required");
  const findPatient = await patient.findOne({ _id: userId });
  if (!findPatient) throw new Error("Patient is not found");

  const deleteAddress = await patient.findByIdAndUpdate(
    userId,
    { $pull: { address: { _id: addressId } } },
    { new: true }
  );
  if (!deleteAddress) throw new Error("Error occured while deleting address");
  res.status(200).json({ status: "Success" });
};
module.exports = deleteAddress;
