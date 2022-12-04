
import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        _id: String,
        dateOfBirth: String,
        firstName: String,
        handle: String,
        lastName: String,
        profImg: String,
        role: {
            type:String,
            enum: ['User', 'Admin', 'Seller'],
            default: 'User'
        }
    },
    {
        collection: 'users'
    }
);

export default schema;

