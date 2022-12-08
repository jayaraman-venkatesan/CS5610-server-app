import * as productsDao from '../../dao/products-dao.js';
import * as usersDao from '../../dao/users-dao.js';
import axios from 'axios';

import fetch from 'node-fetch';


const HomeController = (app) => {
   app.get('/api/products', getProducts)
}


const fetchConsolidateProducts = (API, props, res) => {
   fetch(API)
      .then(response => response.json())
      .then((data) => {
         const onlineProductDetails = data.products.map(object => {
            return { ...object, status: "Approved" }
         })
         res.json([...props, ...onlineProductDetails])
         return;
      });
}


const getProducts = async (req, res) => {

   const { user, category } = req.query;
   const userRes = await usersDao.findUserById(user);
   if (userRes.length === 0) {
      res.sendStatus(403);
      return
   }
   const userDetails = userRes[0];
   let props = [{}]

   const API = !!category ? `https://dummyjson.com/products/category/${category}` : "https://dummyjson.com/products?limit=100";

   switch (userDetails.role) {
      case 'Admin':
         console.log("user role", userDetails.role)
         props = await productsDao.findAllProducts();
         fetchConsolidateProducts(API, props, res);
         return
      case 'Seller':
         console.log("user role", userDetails.role)
         props = await productsDao.findProductsByOwnerId(user);
         fetchConsolidateProducts(API, props, res);
         return;
      default:
         console.log("user role", userDetails.role)
         props = await productsDao.findProductsByStatus("Approved");
         fetchConsolidateProducts(API, props, res);
         return;

   }
}

export default HomeController
