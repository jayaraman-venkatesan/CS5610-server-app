import * as productsDao from '../../dao/products-dao.js';
import * as usersDao from '../../dao/users-dao.js';
import axios from 'axios';

import fetch from 'node-fetch';


const HomeController = (app) => {
   app.get('/api/products', getProducts)
}


const fetchConsolidateProducts = (API, props, res, category) => {
  const filteredProducts=category!=null? props.filter(
   p=>p.toObject().category===category
   )
   :props;
   fetch(API)
      .then(response => response.json())
      .then((data) => {
         const onlineProductDetails = data.products.map(object => {
            return { ...object, status: "Approved" }
         })
         res.json([...filteredProducts, ...onlineProductDetails])
         return;
      });
}


const getProducts = async (req, res) => {

   const { user, category } = req.query;
   const userDetails = await usersDao.findUserById(user);
   let props = [{}]
   const API = !!category ? `https://dummyjson.com/products/category/${category}` : "https://dummyjson.com/products?limit=100";

   switch (userDetails?.role) {
      case 'Admin':
         props = await productsDao.findAllProducts();
         fetchConsolidateProducts(API, props, res, category);
         return
      case 'Seller':
         props = await productsDao.findProductsByOwnerId(user);
         fetchConsolidateProducts(API, props, res, category);
         return;
      default:
         props = await productsDao.findProductsByStatus("Approved");
         fetchConsolidateProducts(API, props, res, category);
         return;

   }
}

export default HomeController
