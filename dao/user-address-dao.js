import userAddressModel from "../models/user-address-model.js";

export const findAddressesByUserName = async (userName) => {
    const userAddresses = await userAddressModel.find({userName})
    return userAddresses
}

export const findAddressesById = async (addressId) => {
    const userAddress = await userAddressModel.findOne({_id: addressId})
    return userAddress
}

export const deleteUserAddressById = async (userAddressId) => {
   const status = await userAddressModel.deleteOne({id:userAddressId})
    return status
}

export const createUserAddress = async (userAddressRequest) => {
    const userAddress = await userAddressModel.create(userAddressRequest)
    return userAddress;
}

