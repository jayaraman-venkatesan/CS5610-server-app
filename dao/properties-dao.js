import propertiesModel from "../models/property-model.js";


export const findPropertiesByStatus = async (s) => await propertiesModel.find({status: s});

export const findPropertiesByOwnerId = async (s) => await propertiesModel.find({owner: s});


export const findAllProperties = async () => {
    const properties = await propertiesModel.find()
    return properties
}

export const findPropertyByUsername = async (username) =>
    await propertiesModel.findOne({username})

export const createProperty = async (property) => {
    const actualInsertedProperty = await propertiesModel.create(property)
    return actualInsertedProperty
}
export const deleteProperty = async (pid) => {
    const status = await propertiesModel.deleteOne({_id: pid})
    return status
}

export const updateProperty = async (pid, userUpdates) =>
    await propertiesModel.updateOne({_id: pid},
                                    {$set: userUpdates})