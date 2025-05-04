const mongoose = require("mongoose");
const carts = require("../../../models/cart");

const deleteProduct = async (req, res) => {
  const userId = req.params.id;
  const medicineId = req.params.medicineId;

  const deleteProd = await carts.updateOne(
    { id: userId },
    {
      $pull: {
        product: {
          medicineId: medicineId,
        },
      },
    }
  );

  if (deleteProd.modifiedCount === 0) throw new Error("No product found");
  res.status(200).json({ status: "Deleted successfully", deleteProd });
};
module.exports = deleteProduct;
