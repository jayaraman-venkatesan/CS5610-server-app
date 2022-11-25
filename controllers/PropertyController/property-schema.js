import mongoose from "mongoose";

const propertiesSchema = mongoose.Schema({
                                         name: {type: String, required: true},
                                         city: {type: String },
                                         state: {type: String},
                                         rating: String,
                                         host: String,
                                             amenities :String,
                                             cost:String,
                                             cleaning_fee:String,
                                             service_fee:String,
                                             short_description:String,
                                             description:String,
                                             bedrooms:Number,
                                         status :{type:String,enum:['APPROVED','INREVIEW']},
                                         typeOfUSer: {type: String, enum: ['USER', 'ADMIN', 'OWNER']}
                                     }, {collection: 'properties'})

export default propertiesSchema;