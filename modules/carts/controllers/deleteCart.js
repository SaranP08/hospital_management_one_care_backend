const mongoose = require("mongoose");
const cart = require("../../../models/cart");

const deleteCart = async (id) => {
  try {
    const result = await cart.deleteOne({ _id: id }); // `_id` is the standard field for IDs in MongoDB
    if (result.deletedCount === 0) {
      throw new Error("No cart found with the provided id");
    }
    return { success: true, message: "Cart deleted successfully" };
  } catch (error) {
    throw new Error(`Error occurred while deleting cart: ${error.message}`);
  }
};

module.exports = deleteCart;
