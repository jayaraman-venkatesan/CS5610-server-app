import requests from './requests.js'

const AdminController = (app) => {
    app.get('/api/getAllRequests', getAllRequest)
 }

 
const getAllRequest = (req, res) => {
    res.json(requests);
}

 export default AdminController
 