import productRequestModel from "../models/product_request-model.js";


export const findAllRequests = async () => {
    const productReq = await productRequestModel.find()
    return productReq
}



export const approveRequest = async (req_id) => {
    const productReq = await productRequestModel.updateOne({id:req_id},{$set: {status:"Approved"}})
    return productReq
}

export const rejectRequest = async (req_id) => {
    const productReq = await productRequestModel.updateOne({id:req_id},{$set: {status:"Rejected"}})
    return productReq
}


