const patient = require("../../../models/login");

const getAddressById = async (req, res) => {
  const userId = req.params.userId;
  const addressId = req.params.addressId;
  if (!userId) throw new Error("User id is required");

  const profile = await patient.findOne({ _id: userId });
  if (!profile) throw new Error("User not found");

  const address = profile.address.id(addressId);

  if (!address) throw new Error("Address Not found");
  res.status("200").json(address);
};

module.exports = getAddressById;
