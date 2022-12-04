import mongoose from 'mongoose';
import productRequestSchema from '../schemas/product_request-schema.js';

const productRequestModel = mongoose
    .model('ProductRequest', productRequestSchema);

export default productRequestModel;