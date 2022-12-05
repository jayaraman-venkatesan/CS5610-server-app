import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        id: String,
        productID: String,
        productName: String,
        seller: String,
        date: String,
        status: String
    },
    {
        collection: 'product_request'
    }
);

export default schema;