
import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        _id:String,
        firstName: String,
        lastName: String,
        role: {
            type:String,
            enum: ['Buyer', 'Admin', 'Seller'],
            default: 'User'
        },
        userName: String,
        password: String,
        email: String,
        dateOfBirth:Date
    },
    {
        collection: 'users'
    }
);

export default schema;

