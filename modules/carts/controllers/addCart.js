const cart = require("../../../models/cart");
const medicines = require("../../../models/medicines");
const addToCart = async (req, res) => {
  const { id, product } = req.body;
  if (!id) throw new Error("Id is required");
  if (!product) throw new Error("Product details is required");
  const isCartNotEmpty = await cart.findOne({ id: id });

  if (!isCartNotEmpty) {
    for (const med of product) {
      if (!med.medicineId) throw new Error("Medicine id is required");
      if (!med.qty) throw new Error("Quantity is required");
    }
    const newCart = new cart(req.body);
    await newCart.save().then(
      (data) => {
        res.status(200).json({ status: "Items added to cart" });
      },
      (error) => {
        res.status(500).json({ status: "Error occured while adding to cart" });
      }
    );
  } else {
    for (const med of product) {
      if (!med.medicineId) throw new Error("Medicine id is required");
      if (!med.qty) throw new Error("Quantity is required");
      const carts = await cart.findOne({
        id: id,
        "product.medicineId": med.medicineId,
      });
      if (carts) {
        const isFound = carts?.product.find(
          (medicine) => medicine.medicineId == med.medicineId
        );
        console.log(isFound);
        if (isFound) {
          const qty = isFound.qty;
          const updateCart = await cart.updateOne(
            {
              id: id,
              "product.medicineId": med.medicineId,
            },
            {
              $set: {
                "product.$.qty": qty + med.qty,
              },
            }
          );
          if (!updateCart)
            throw new Error("Error occured while updating cart details");
        }
      } else {
        const updateNewCart = await cart.updateOne(
          {
            id: id,
          },
          {
            $push: {
              product: {
                medicineId: med.medicineId,
                qty: med.qty,
              },
            },
          }
        );
        if (!updateNewCart)
          throw new Error("Error occured while updating new cart details");
      }
      res.status(200).json({ Status: "Success" });
    }
  }
};

module.exports = addToCart;
