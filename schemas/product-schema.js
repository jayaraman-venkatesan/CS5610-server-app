import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        id: String,
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        rating: Number,
        stock: Number,
        brand: String,
        categories: [],
        thumbnail: String,
        images: [{
            type: String
        }],
        seller: String,
        sellerUsername: String,
        status: {
            type: String,
            enum: ['Approved', 'Rejected', 'Pending'],
            default: 'user'
        },
    },
    {
        collection: 'products_info'
    }
);

export default schema;