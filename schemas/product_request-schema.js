import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        _id: Number,
        id: String,
        productID: Number,
        productName: String,
        seller: String,
        Date: String,
        status:String
    },
    {
        collection: 'product_request'
    }
);

export default schema;