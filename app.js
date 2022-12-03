import express from 'express';
import mongoose from "mongoose";

import cors from 'cors'

import HomeController from "./controllers/home/home-controller.js"
import AdminController from './controllers/admin/admin-request.js';
import ProductController from "./controllers/ProductController/product-controller.js";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4
}

mongoose.connect('mongodb://localhost:27017/OnlineProductSearch', options)

const app = express()

app.use(cors())
app.use(express.json());
HomeController(app);
AdminController(app);
ProductController(app);
app.listen(4000);