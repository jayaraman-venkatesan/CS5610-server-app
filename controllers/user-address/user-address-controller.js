import * as  userAddressDao from '../../dao/user-address-dao.js';
import {validateAuthToken} from '../../middleware/validateAuthToken.middleware.js';
import * as userDao from '../../dao/users-dao.js'


const UserAddressController = (app) => {
    const getUserAddress = async (req, res) => {
        const { userName } = req;
        const addresses = await userAddressDao.findAddressesByUserName(userName);
        res.json(addresses);
    }

    const createUserAddress = async (req, res) => {
        const address = await userAddressDao.createUserAddress(req.body);

        
        res.json(address);
    }

    const deleteUserAddress = async (req, res) => {
        const { id: addressId } = req.params;
        const status = await userAddressDao.deleteUserAddressById(addressId);
        res.json(status);
    }

    app.get('/api/user-addresses', validateAuthToken, getUserAddress);
    app.post('/api/user-addresses', validateAuthToken, createUserAddress);
    app.delete('/api/user-addresses/:id', validateAuthToken, deleteUserAddress);

}

export default UserAddressController;