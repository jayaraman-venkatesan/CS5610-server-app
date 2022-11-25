import express from 'express';

import cors from 'cors'

import HomeController
  from "./controllers/home/home-controller.js"

  import AdminController from './controllers/admin/admin-request.js';


const app = express()

app.use(cors())
app.use(express.json());

HomeController(app);

AdminController(app);



app.listen(4000);