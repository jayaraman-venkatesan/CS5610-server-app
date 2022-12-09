
import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        productId: String,
        userName: String,
        quantity: Number,
        addressId: String,
        deliveryInstruction: String
    },
    {
        collection: 'orders'
    }
);

export default schema;

