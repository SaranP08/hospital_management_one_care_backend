const mongoose = require("mongoose");
const cart = require("../../../models/cart");
const medicines = require("../../../models/medicines");

const getCart = async (req, res) => {
  try {
    const id = req.params.id;
    const carts = await cart.findOne({ id: id });
    if (!carts) throw new Error("Invalid cart id");
    let response = [];
    const promises = carts.product.map(async (medicineDetail) => {
      const getMedicine = await medicines.findOne({
        _id: medicineDetail.medicineId,
      });

      if (!getMedicine) throw new Error("Medicine not found");
      const data = {
        _id: medicineDetail._id,
        name: getMedicine.name,
        medicineId: getMedicine._id,
        qty: medicineDetail.qty,
        totalQty: getMedicine.qty,
        actualCost: getMedicine.cost,
        imageUrl: getMedicine.imageUrl,
      };
      response.push(data);
      console.log(response);
    });
    await Promise.all(promises);
    response.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    res.status(200).json({ cartId: carts._id, carts: response });
  } catch (err) {
    res.status(500).json({ error: err.message ?? err });
  }
};

module.exports = getCart;
