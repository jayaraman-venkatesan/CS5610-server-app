
import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        _id: String,
        dateOfBirth: String,
        firstName: String,
        handle: String,
        lastName: String,
        profImg: String,
        role: String
    },
    {
        collection: 'users'
    }
);

export default schema;

