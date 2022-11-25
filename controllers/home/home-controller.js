import properties from '../HomePageController/properties.js'

const HomeController = (app) => {
    app.get('/api/getAllProperties', getAllProperties)
 }

 
 const getAllProperties = (req, res) => {
    res.json(properties);
 }

 export default HomeController
 