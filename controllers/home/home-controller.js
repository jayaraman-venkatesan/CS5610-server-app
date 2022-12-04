import * as productsDao from '../../dao/products-dao.js';
import * as usersDao from '../../dao/users-dao.js';
import axios from 'axios';

import fetch from 'node-fetch';


const HomeController = (app) => {
   app.get('/api/products', getProducts)
}


const getProducts = async (req, res) => {

   const { user, category } = req.query;
   // const userRes = await usersDao.findUserById(user);

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
   // const productsFromDb = await productsDao.findAllProducts();
   const API = !!category ? `https://dummyjson.com/products/category/${category}` : "https://dummyjson.com/products";


   fetch(API)
      .then(response => response.json())
      .then((data)=>{res.json(data.products)});




}

export default HomeController
