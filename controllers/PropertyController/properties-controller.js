import posts from "./property.json";
let properties = posts;

const PropertyController = (app) =>{
    app.post('/api/property', createProperty);
    app.get('/api/property', findAllProperties);
    app.put('/api/property/:pid', updateProperty);
    app.delete('/api/property/:pid', deleteProperty);

}

const createProperty = (req, res) => {
    const newProperty=req.body;
    newProperty._id = (new Date()).getTime()+'';
    newProperty.likes = 0;
    newProperty.liked = false;
    properties.push(newProperty);
    res.json(newProperty);
}
const findAllProperties  = (req, res) => {
    res.json(properties);

}
const updateProperty = (req, res) => {
    const propertyIdToUpdate = req.params.pid;
    const updates = req.body;
    const propertyIndex = properties.findIndex(
        (t) => t._id === propertyIdToUpdate)
    properties[propertyIndex] =
        {...properties[propertyIndex], ...updates};
    res.sendStatus(200);

}
const deleteProperty = (req, res) => {
    const propertyIdToDelete = req.params.tid;
    properties = properties.filter((t) =>
                             t._id !== propertyIdToDelete);
    res.sendStatus(200);
}

export default PropertyController;