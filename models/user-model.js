import mongoose from 'mongoose';
import userSchema from '../schemas/user-schema.js';

const usersModel = mongoose
    .model('UserModel', userSchema);
    
export default usersModel;