import productsModel from "../models/product-model.js";


export const findProductByStatus = async (s) => await productsModel.find({status: s});

export const findProductByOwnerId = async (s) => await productsModel.find({owner: s});


export const findAllProducts = async () => {
    const properties = await productsModel.find()
    return properties
}

export const findProductByProductId = async (pid) =>
    await productsModel.find({_id:pid})

export const findProductByUsername = async (username) =>
    await productsModel.findOne({username})

export const createProduct = async (property) => {
    const actualInsertedProduct = await productsModel.create(property)
    return actualInsertedProduct
}
export const deleteProduct = async (pid) => {
    const status = await productsModel.deleteOne({_id: pid})
    return status
}

export const updateProduct = async (pid, userUpdates) =>
    await productsModel.updateOne({_id: pid},
                                    {$set: userUpdates})