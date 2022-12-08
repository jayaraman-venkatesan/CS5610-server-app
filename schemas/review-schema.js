import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        id: String,
        product_id: String,
        userName: String,
        userFirstName: String,
        userLastName: String,
        comment: String,
        rating: Number,
        date: String
    },
    {
        collection: 'reviews'
    }
);

export default schema;