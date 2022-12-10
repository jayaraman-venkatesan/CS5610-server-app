import orderModel from "../models/order-model.js";

export const createOrder = async (orderRequest) => {
    return await orderModel.create(orderRequest)
}

export const getOrdersByUserName = async (userName) => {
    return await orderModel.find({ userName },{},{ sort: { date: -1 }})
}

export const cancelOrder = async (orderId) => {
    return await orderModel.updateOne({ _id:orderId },{ $set: { isCancelled: true } })
}