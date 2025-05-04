const mongoose = require("mongoose");
const ordersSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
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
  purchasedAmt: {
    required: true,
    type: Number,
  },
  purchasedDate: {
    required: true,
    type: Date,
  },
  status: {
    required: true,
    type: String,
  },

  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  deliveryDate: {
    required: false,
    type: Date,
  },

  paymentMode: {
    type: String,
    enum: ["CASH_ON_DELIVERY", "ONLINE_TRANSACTION"],
    required: true,
  },
});
module.exports = mongoose.model("orders", ordersSchema);
