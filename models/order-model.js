import mongoose from 'mongoose';
import orderSchema from '../schemas/order-schema.js';

const orderModel = mongoose
    .model('OrderModel', orderSchema);

export default orderModel;
