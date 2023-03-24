const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  user: {
    type: [mongoose.Types.ObjectId],
    ref: "user",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("order", OrderSchema);
