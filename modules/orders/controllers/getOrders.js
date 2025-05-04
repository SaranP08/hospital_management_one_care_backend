const medicines = require("../../../models/medicines");
const orders = require("../../../models/orders");

const getOrders = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("id is required");

    const userOrders = await orders.find({ userId: id });
    if (!userOrders.length) res.status(200).json([]);

    // Iterate over each order
    const updatedOrders = await Promise.all(
      userOrders.map(async (order) => {
        const updatedProducts = await Promise.all(
          order.product.map(async (data) => {
            const getMed = await medicines.findOne({
              _id: data.medicineId,
            });
            if (!getMed) throw new Error("Enter valid medicine id");

            // Create a new object with the original fields and the new 'name' field
            return {
              medicineId: data.medicineId,
              qty: data.qty,
              name: getMed.name,
            };
          })
        );

        // Return the order with updated products
        console.log(updatedProducts);
        return {
          ...order._doc,
          product: updatedProducts,
        };
      })
    );

    console.log(updatedOrders);
    res.status(200).json({ data: updatedOrders });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = getOrders;
