const mongoose = require("mongoose");
const cartModel = new mongoose.Schema({
  id: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  product: [
    {
      medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "medicines",
      },
      qty: Number,
    },
  ],
});
module.exports = mongoose.model("Carts", cartModel);
