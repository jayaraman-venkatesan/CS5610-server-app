import express from 'express';
import mongoose from "mongoose";

import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

import HomeController from "./controllers/home/home-controller.js"
import AdminController from './controllers/admin/admin-request.js';
import ProductController from "./controllers/ProductController/products-controller.js";
import ReviewController from "./controllers/ReviewController/reviews-controller.js";
import CategoryController from './controllers/category/category-controller.js';
import ManageProductRequestController from './controllers/home/manage-request.js'
import UsersController from "./controllers/UsersController/users-controller.js";
import UserAddressController from './controllers/user-address/user-address-controller.js';
import OrderController from './controllers/order/order-controller.js';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4
}

// mongoose.connect('mongodb://localhost:27017/OnlineProductSearch', options)

mongoose.connect('mongodb+srv://vj:76ESzb8OkA6hzL84@cluster0.ax6xlyh.mongodb.net/team52?retryWrites=true&w=majority')

const app = express()

app.use(cors())
app.use(express.json());
HomeController(app);
AdminController(app);
ManageProductRequestController(app);
ProductController(app);
CategoryController(app);
ReviewController(app);
UsersController(app);
UserAddressController(app);
OrderController(app)
app.listen(4000);