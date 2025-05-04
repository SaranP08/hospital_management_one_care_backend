const medicines = require("../../../models/medicines");
const addMedicine = async (req, res) => {
  try {
    const { name, description, qty, cost, imageUrl } = req.body;
    if (!name) throw new Error("Name is required");
    if (!description) throw new Error("Description is required");
    if (!qty) throw new Error("Quantity is required");
    if (!cost) throw new Error("Cost is required");
    if (!imageUrl) throw new Error("Image URL is required");
    const newMedicine = new medicines(req.body);
    await newMedicine
      .save()
      .then(() => {
        res.status(400).json({ msg: "Added Successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err: err });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
module.exports = addMedicine;
