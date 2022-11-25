import mongoose from 'mongoose';
import propertySchema from '../schemas/property-schema.js';

const propertiesModel = mongoose
    .model('PropertyModel', propertySchema);
export default propertiesModel;
