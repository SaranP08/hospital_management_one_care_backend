const mongoose = require("mongoose");
const carts = require("../../../models/cart");

const updateQty = async (req, res) => {
  const userId = req.params.id;
  const { medicineId, qty } = req.body;
  const update = await carts.updateOne(
    { id: userId, "product.medicineId": medicineId },
    { $set: { "product.$.qty": qty } }
  );

  if (!update) throw new Error("Error occured");

  res.status(200).json({ status: "Updated successfully", update });
};

module.exports = updateQty;
