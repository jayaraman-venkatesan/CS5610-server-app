import axios from 'axios';



const CategoryController = (app) => {

    const getCategories = async (_req, res) => {

        const { data: externalApiCategories } = await axios.get("https://dummyjson.com/products/categories");

        res.json(externalApiCategories);

    }

    app.get('/api/products/categories', getCategories);

}



export default CategoryController;