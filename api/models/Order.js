const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: [true, "User is required!"],
    },
    program: {
        type: Schema.Types.ObjectId,
        ref: "WashingProgram"
    },
    discount: {
        type: Boolean,
        default: false
    },
    priceToPay: {
        type: Number,
        required: [true, "Price is required!"]
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;