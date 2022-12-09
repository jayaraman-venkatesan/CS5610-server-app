import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        id: String,
        userName: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        phoneNumber: String,
        name: String
    },
    {
        collection: 'user_address'
    }
);

export default schema;