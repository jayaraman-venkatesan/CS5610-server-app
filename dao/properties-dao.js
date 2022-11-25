import propertiesModel from "../models/property-model.js";

export const findProperties = () => propertiesModel.find();

export const findPropertiesByStatus = (s) => propertiesModel.find({status: s});

export const findPropertiesByOwnerId = (s) => propertiesModel.find({owner: s});



// export const createTuit = (tuit) => propertiesModel.create(tuit);
// export const deleteTuit = (tid) => propertiesModel.deleteOne({ _id: tid });
// export const updateTuit = (tid, tuit) => propertiesModel.updateOne({ _id: tid }, { $set: tuit })