import * as  orderDao from '../../dao/order-dao.js';
import { validateAuthToken } from '../../middleware/validateAuthToken.middleware.js';

const OrderController = (app) => {
    const getOrders = async (req, res) => {
        const { userName } = req;
        const orders = await orderDao.getOrders(userName);
        res.json(orders);
    }

    const createOrder = async (req, res) => {
        const { userName } = req;
        const createOrderRequest = {
            ...req.body,
            userName
        }
        const order = await orderDao.createOrder(createOrderRequest);
        res.json(order);
    }

    app.get('/api/orders', validateAuthToken, getOrders);
    app.post('/api/orders', validateAuthToken, createOrder);
}

export default OrderController;