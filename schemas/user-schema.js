
import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {

        firstName: String,
        _id: String,
        lastName: String,
        userName: String,
        password: String,
        email: String,
        role: String
    },
    {
        collection: 'users'
    }
);

export default schema;

//handle: String,
//dateOfBirth: String,
//profImg: String,
