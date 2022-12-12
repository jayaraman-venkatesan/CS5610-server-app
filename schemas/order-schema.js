
import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        productId: String,
        userName: String,
        quantity: Number,
        addressIds: [],
        price: Number,
        deliveryInstruction: String,
        isCancelled: {
            type: Boolean,
            default: false
        },
        date: String,
    },
    {
        collection: 'orders'
    }
);

export default schema;

