import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        _id: String,
        amenities: String,
        bedrooms: String,
        city: String,
        cleaning_fee: String,
        cost: String,
        description: String,
        host: String,
        image: String,
        name: String,
        owner: String,
        path2: String,
        path3: String,
        rating: String,
        service_fee: String,
        short_description: String,
        state: String,
        status: String
    },
    {
        collection: 'properties_info'
    }
);

export default schema;