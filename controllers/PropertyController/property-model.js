import mongoose from "mongoose";
import propertiesSchema from "./property-schema.js";

const propertiesModel = mongoose.model('PropertyModel', propertiesSchema)

export default propertiesModel