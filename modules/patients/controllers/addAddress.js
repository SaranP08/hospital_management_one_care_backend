const patient = require("../../../models/login");
const addAddress = async (req, res) => {
  const userId = req.params.userId;
  const { name, houseNo, landmark, street, city, state, phone, pincode } =
    req.body;
  if (!userId) throw new Error("User ID is required");
  if (!name) throw new Error("name is required");
  if (!houseNo) throw new Error("House no is required");
  if (!street) throw new Error("street is required");
  if (!city) throw new Error("City is required");
  if (!state) throw new Error("State is required");
  if (!phone) throw new Error("Phone number is required");
  if (!pincode) throw new Error("Pincode is required");
  const findPatient = await patient.findOne({ _id: userId });
  if (!findPatient) throw new Error("No patient exist");
  const updatePatient = await patient.updateOne(
    { _id: userId },
    {
      $push: {
        address: {
          name: name,
          houseNo: houseNo,
          street: street,
          city: city,
          state: state,
          landmark: landmark ?? "",
          phone: phone,
          pincode: pincode,
        },
      },
    }
  );
  if (!updatePatient) throw new Error("Error occured while updating patient");
  res.status(200).json({ status: "Updated" });
};

module.exports = addAddress;
