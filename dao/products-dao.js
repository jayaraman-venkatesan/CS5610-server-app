import productModel from "../models/product-model.js";


export const findProductsByStatus = async (s) => await productModel.find({ status: s });

export const findProductsBySellerUsername = async (s) => await productModel.find({ sellerUsername: s });

export const findProductsBySellerUsernameAndCategory = async (sellerUsername, category) =>{ 
   return await productModel.find({ sellerUsername , category})
};


export const findAllProducts = async () => {
    const product = await productModel.find()
    return product
}

export const approveProduct = async (req_id) => {
    const productReq = await productModel.updateOne({ id: req_id }, { $set: { status: "Approved" } })
    return productReq
}

export const rejectProduct = async (req_id) => {
    const productReq = await productModel.updateOne({ id: req_id }, { $set: { status: "Rejected" } })
    return productReq
}



export const findProductsByCategory = async (category) => {
    const products = await productModel.find({ category: category })
    return products
}

export const findProductByproductId = async (pid) =>
    await productModel.findOne({ id: pid })

export const findProductByUsername = async (username) =>
    await productModel.findOne({ username })

export const createProduct = async (product) => {
    const actualInsertedProduct = await productModel.create(product)
    return actualInsertedProduct
}
export const deleteProduct = async (pid) => {
    const status = await productModel.deleteOne({ _id: pid })
    return status
}

export const updateProduct = async (pid, userUpdates) =>
    await productModel.updateOne({ _id: pid },
        { $set: userUpdates })