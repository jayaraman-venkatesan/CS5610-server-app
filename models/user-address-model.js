import mongoose from 'mongoose';
import userAddressSchema from '../schemas/user-address-schema.js';

const userAddressModel = mongoose
.model('UserAddressModel', userAddressSchema);

export default userAddressModel;
