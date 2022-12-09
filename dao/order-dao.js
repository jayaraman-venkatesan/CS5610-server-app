import orderModel from "../models/order-model.js";

export const createOrder = async (orderRequest) => {
    return await orderModel.create(orderRequest)
}

export const getOrderByUserName = async (userName) => {
    return await orderModel.find({ userName })
}