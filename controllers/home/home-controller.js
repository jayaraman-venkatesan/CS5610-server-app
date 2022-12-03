import * as propertiesDao from '../../dao/properties-dao.js';
import * as usersDao from '../../dao/users-dao.js'


const HomeController = (app) => {
    app.get('/api/properties', getProperties)
 }

 
 const getProperties =async (req, res) => {

   const {user}=req.query;
   const userRes = await usersDao.findUserById(user);

   let props = [{}]

   // switch(userRes.role){
   //    case 'Admin': 
   //    props = await propertiesDao.find();
   //    res.json(props);
   //    return
   //    break;
   //    case 'owner': 
   //    props = await propertiesDao.findPropertiesByOwnerId(user);
   //    res.json(props);
   //    break;
   //    default: 
   //     props = await propertiesDao.findPropertiesByStatus("approved");
   //    res.json(props);
   //    break;
      
   // }

   if(userRes[0].role === 'owner'){
      props = await propertiesDao.findPropertiesByOwnerId(user);
      console.log(props);
      console.log(user);
      console.log("here 1");
      res.json(props);
      return;
   } else if (userRes[0].role === 'Admin'){
      console.log("here 2");
      props = await propertiesDao.findAllProperties();
      res.json(props);
      return
   } else {
      console.log("here 3");
      console.log(userRes);
      props = await propertiesDao.findPropertiesByStatus("approved");
      res.json(props);  
   }
 }

 export default HomeController
 