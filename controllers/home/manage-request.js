import * as productReqDao from '../../dao/product_request-dao.js'

const ManageProductRequestController = (app) => {
    app.get('/api/products/requests', getProductRequests)
    app.get('/api/products/request/approve/:id',approveRequest)
}


const getProductRequests = async (_req, res) => {
    const prodRequests = await productReqDao.findAllRequests();
    res.json(prodRequests)
}

const approveRequest = async (req, res) => {
    const req_id = req.params.id;
    console.log(req_id)
    const prodRequests = await productReqDao.approveRequest(req_id);
    getProductRequests(req,res);
}

export default ManageProductRequestController;