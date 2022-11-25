import * as propertiesDao from '../../dao/properties-dao.js';

const PropertyController = (app) =>{

    const createProperty = async (req, res) => {
        const newProperty=req.body;
        const actualProperty = await propertiesDao.createProperty(newProperty)
        res.json(actualProperty)
    }
    const findAllProperties  = async (req, res) => {
        const properties = await propertiesDao.findAllProperties()
        res.json(properties);

    }
    const updateProperty = async (req, res) => {
        const propertyIdToUpdate = req.params.pid;
        const updates = req.body;
        const status = await propertiesDao.updateProperty(propertyIdToUpdate,updates)
        res.sendStatus(status);

    }
    const deleteProperty = async (req, res) => {
        const propertyIdToDelete = req.params.pid;
        const status = await propertiesDao.deleteProperty(propertyIdToDelete)
        res.sendStatus(status);
    }

    const findPropertyByPropertyId = async(req,res) =>{
        const pid = req.params.pid
        const property = await propertiesDao.findPropertyByPropertyId(pid)
        res.json(property)
    }
    app.post('/api/property', createProperty);
    app.get('/api/property', findAllProperties);
    app.get('/api/property/:pid', findPropertyByPropertyId);
    app.put('/api/property/:pid', updateProperty);
    app.delete('/api/property/:pid', deleteProperty);

}


export default PropertyController;