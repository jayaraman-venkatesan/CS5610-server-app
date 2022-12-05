import * as productsDao from '../../dao/products-dao.js';
import * as usersDao from '../../dao/users-dao.js';
import axios from 'axios';


const HomeController = (app) => {
   app.get('/api/products', getProducts)
}


const getProducts = async (req, res) => {

   const { user } = req.query;
   const userRes = await usersDao.findUserById(user);

   let props = [{}]

   // switch(userRes.role){
   //    case 'Admin': 
   //    props = await productsDao.find();
   //    res.json(props);
   //    return
   //    break;
   //    case 'owner': 
   //    props = await productsDao.findProductsByOwnerId(user);
   //    res.json(props);
   //    break;
   //    default: 
   //     props = await productsDao.findProductsByStatus("approved");
   //    res.json(props);
   //    break;

   // }
   const productsFromDb = await productsDao.findAllProducts();
   const { data: onlineProducts } = await axios.get("https://mocki.io/v1/3dac7535-7824-40a4-825e-948124e70222");
   res.json([...onlineProducts, ...productsFromDb]);

}

export default HomeController
